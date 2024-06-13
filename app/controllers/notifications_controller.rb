class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @notifications = current_user.notifications.order(created_at: :desc)
  end

  def show
    @notification = current_user.notifications.find(params[:id])
    @notification.update(read: true)

    if @notification.notifiable_type == "Answer"
      redirect_to question_path(@notification.notifiable.question)
    elsif @notification.notifiable_type == "Question"
      redirect_to question_path(@notification.notifiable)
    else
      redirect_to notifications_path
    end
  end

  def mark_as_read
    @notification = current_user.notifications.find(params[:id])
    @notification.update(read: true)
    redirect_to notifications_path, notice: '通知を既読にしました。'
  end
end
