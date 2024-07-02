module Api
  module V1
    class QuestionsController < BaseController
      before_action :authenticate_user!, except: [:index, :show]
      before_action :set_question, only: [:show, :edit, :update, :destroy, :remove_image]
      before_action :authorize_user!, only: [:edit, :update, :destroy, :remove_image]

      def index
        @questions = if params[:search].present?
                       normalized_search = normalize_search_query(params[:search])
                       search_terms = normalized_search.split(' ')
                       conditions = search_terms.map { |term| '(title LIKE ? OR content LIKE ?)' }.join(' AND ')
                       values = search_terms.map { |term| ["%#{term}%", "%#{term}%"] }.flatten
                       Question.where(conditions, *values)
                     else
                       Question.where(draft: false)
                     end

        @questions = case params[:sort]
                     when 'oldest'
                       @questions.order(created_at: :asc)
                     when 'my_posts'
                       @questions.where(user: current_user)
                     else
                       @questions.order(created_at: :desc)
                     end

        render json: @questions
      end

      def autocomplete
        normalized_search = normalize_search_query(params[:query])
        search_terms = normalized_search.split(' ')
        conditions = search_terms.map { |term| '(title LIKE ? OR content LIKE ?)' }.join(' AND ')
        values = search_terms.map { |term| ["%#{term}%", "%#{term}%"] }.flatten
        results = Question.where(conditions, *values).pluck(:title, :content).flatten.uniq
        render json: results
      end

      def show
        @answers = @question.answers.includes(:user, :likes)
        @answers = case params[:sort]
                   when 'oldest'
                     @answers.order(created_at: :asc)
                   when 'likes'
                     @answers.left_joins(:likes).group(:id).order('COUNT(likes.id) DESC')
                   else
                     @answers.order(created_at: :desc)
                   end

        render json: { question: @question, answers: @answers }
      end

      def create
        @question = current_user.questions.build(question_params)
        if params[:draft].present?
          @question.draft = true
          if @question.save
            @question.user.notifications.create(message: "下書きの質問があります", notifiable: @question, read: true)
            render json: { message: '質問が下書き保存されました。', question: @question }, status: :created
          else
            render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
          end
        else
          @question.draft = false
          if @question.save
            render json: { message: '質問が投稿されました。', question: @question }, status: :created
          else
            render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

      def update
        images_param = params[:question][:images]
        updated_images = @question.images + images_param.reject(&:blank?)

        if params[:commit].present?
          @question.draft = false
        end

        if @question.update(question_params.merge(images: updated_images))
          render json: { message: '質問が更新されました。', question: @question }
        else
          render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @question.destroy
        render json: { message: '質問が削除されました。' }, status: :ok
      end

      def remove_image
        index = params[:index].to_i
        if index >= 0 && index < @question.images.length
          @question.images.delete_at(index)
          @question.images_will_change!
          if @question.save
            render json: { status: 'success' }
          else
            render json: { status: 'error' }, status: :unprocessable_entity
          end
        else
          render json: { status: 'error' }, status: :unprocessable_entity
        end
      end

      private

      def set_question
        @question = Question.find(params[:id])
      end

      def authorize_user!
        render json: { message: '権限がありません。' }, status: :forbidden unless @question.user == current_user
      end

      def question_params
        params.require(:question).permit(:title, :content, :draft, images: [])
      end

      def normalize_search_query(query)
        query.gsub(/[[:space:]]+/, ' ').strip
      end
    end
  end
end
