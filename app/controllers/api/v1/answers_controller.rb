module Api
  module V1
    class AnswersController < BaseController
      before_action :authenticate_user!
      before_action :set_question
      before_action :set_answer, only: [:edit, :update, :destroy]
      before_action :authorize_user!, only: [:edit, :update, :destroy]

      def create
        @answer = @question.answers.build(answer_params)
        @answer.user = current_user
        if @answer.save
          create_notification(@question.user, @answer)
          render json: { message: '回答が投稿されました。', answer: @answer }, status: :created
        else
          render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
        render json: { answer: @answer }
      end

      def update
        if @answer.update(answer_params)
          render json: { message: '回答が更新されました。', answer: @answer }, status: :ok
        else
          render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @answer.destroy
        render json: { message: '回答が削除されました。' }, status: :ok
      end

      private

      def set_question
        @question = Question.find(params[:question_id])
      end

      def set_answer
        @answer = @question.answers.find(params[:id])
      end

      def authorize_user!
        render json: { error: '権限がありません。' }, status: :forbidden unless @answer.user == current_user
      end

      def answer_params
        params.require(:answer).permit(:content, :image)
      end

      def create_notification(user, answer)
        return if user == current_user # 自分自身には通知しない

        notification = Notification.create(
          user: user,
          notifiable: answer,
          message: "#{current_user.profile.username} があなたの質問に回答しました。"
        )
        if notification.persisted?
          Rails.logger.debug "Notification created successfully: #{notification.inspect}"
        else
          Rails.logger.debug "Failed to create notification: #{notification.errors.full_messages}"
        end
      end
    end
  end
end
