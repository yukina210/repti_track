class AnswersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_question
  before_action :set_answer, only: [:edit, :update, :destroy]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  def create
    @answer = @question.answers.build(answer_params)
    @answer.user = current_user
    if @answer.save
      Rails.logger.debug "Answer saved successfully"
      create_notification(@question.user, @answer)
      Rails.logger.debug "Notification created successfully"
      redirect_to @question, notice: '回答が投稿されました。'
    else
      Rails.logger.debug "Failed to save answer"
      redirect_to @question, alert: '回答の投稿に失敗しました。'
    end
  end

  def edit
  end

  def update
    if @answer.update(answer_params)
      redirect_to @question, notice: '回答が更新されました。'
    else
      render :edit
    end
  end

  def destroy
    @answer.destroy
    redirect_to @question, notice: '回答が削除されました。'
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end

  def set_answer
    @answer = @question.answers.find(params[:id])
  end

  def authorize_user!
    redirect_to @question, alert: '権限がありません。' unless @answer.user == current_user
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
