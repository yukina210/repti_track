module Api
  module V1
    class NotificationsController < BaseController
      before_action :authenticate_user!

      def index
        @notifications = current_user.notifications.order(created_at: :desc)
        render json: @notifications
      end

      def show
        @notification = current_user.notifications.find(params[:id])
        @notification.update(read: true)

        if @notification.notifiable_type == "Answer"
          render json: { redirect_url: api_v1_question_path(@notification.notifiable.question) }
        elsif @notification.notifiable_type == "Question"
          render json: { redirect_url: api_v1_question_path(@notification.notifiable) }
        else
          render json: { redirect_url: api_v1_notifications_path }
        end
      end

      def mark_as_read
        @notification = current_user.notifications.find(params[:id])
        if @notification.update(read: true)
          render json: { message: '通知を既読にしました。' }
        else
          render json: { error: 'Failed to mark as read' }, status: :unprocessable_entity
        end
      end
    end
  end
end
