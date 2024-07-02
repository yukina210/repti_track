module Api
  module V1
    class LikesController < BaseController
      before_action :authenticate_user!
      before_action :set_answer

      def create
        @like = @answer.likes.build(user: current_user)
        if @like.save
          create_notification(@answer.user, @answer)
          render json: {
            likes_count: @answer.likes.count,
            new_url: api_v1_question_answer_like_path(@answer.question, @answer),
            new_method: 'delete'
          }
        else
          render json: { error: 'Unable to like' }, status: :unprocessable_entity
        end
      end

      def destroy
        @like = @answer.likes.find_by(user: current_user)
        if @like&.destroy
          render json: {
            likes_count: @answer.likes.count,
            new_url: api_v1_question_answer_like_path(@answer.question, @answer),
            new_method: 'post'
          }
        else
          render json: { error: 'Unable to unlike' }, status: :unprocessable_entity
        end
      end

      private

      def set_answer
        @answer = Answer.find(params[:answer_id])
      end

      def create_notification(user, answer)
        return if user == current_user # 自分自身には通知しない

        Notification.create(
          user: user,
          notifiable: answer,
          message: "#{current_user.profile.username} があなたの回答にイイネしました。"
        )
      end
    end
  end
end
