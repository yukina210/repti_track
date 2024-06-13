class QuestionsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_question, only: [:show, :edit, :update, :destroy, :remove_image]
  before_action :authorize_user!, only: [:edit, :update, :destroy, :remove_image]
  before_action :set_notifications, only: [:index]

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
                 else
                   @questions.order(created_at: :desc)
                 end

    @drafts = current_user.questions.where(draft: true) if user_signed_in?
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
  end

  def new
    @question = current_user.questions.build
  end

  def drafts
    @drafts = current_user.questions.where(draft: true)
  end

  def create
    @question = current_user.questions.build(question_params)
    if params[:draft].present?
      @question.draft = true
      if @question.save
        @question.user.notifications.create(message: "下書きの質問があります", notifiable: @question, read: true)
        redirect_to questions_path, notice: '質問が下書き保存されました。'
      else
        render :new
      end
    else
      @question.draft = false
      if @question.save
        respond_to do |format|
          format.turbo_stream { redirect_to @question }
          format.html { redirect_to @question, notice: '質問が投稿されました。' }
        end
      else
        render :new
      end
    end
  end

  def edit
  end

  def update
    images_param = params[:question][:images]
    updated_images = @question.images + images_param.reject(&:blank?)

    if params[:commit].present?
        @question.draft = false
    end

    if @question.update(question_params.merge(images: updated_images))
      redirect_to @question, notice: '質問が更新されました。'
    else
      render :edit
    end
  end

  def destroy
    @question.destroy
    redirect_to questions_path, notice: '質問が削除されました。'
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
    redirect_to questions_path, alert: '権限がありません。' unless @question.user == current_user
  end

  def question_params
    params.require(:question).permit(:title, :content, :draft, images: [])
  end

  def set_notifications
    if user_signed_in?
      @notifications = current_user.notifications.unread
      Rails.logger.debug "Notifications loaded: #{@notifications.count}"
    end
  end

  def normalize_search_query(query)
    query.gsub(/[[:space:]]+/, ' ').strip
  end
end
