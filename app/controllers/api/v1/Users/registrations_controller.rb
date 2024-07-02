# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Api::V1::BaseController
  before_action :set_steps, only: [:new, :create]

  def new
    render json: { message: 'Not implemented' }, status: :not_implemented
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully', user: user }
    else
      render json: { error: user.errors.full_messages.join("\n") }, status: :unprocessable_entity
    end
  end

  def edit
    render json: { message: 'Not implemented' }, status: :not_implemented
  end

  def update
    render json: { message: 'Not implemented' }, status: :not_implemented
  end

  def destroy
    render json: { message: 'Not implemented' }, status: :not_implemented
  end

  protected

  def set_steps
    @steps = [
      t('steps.profile'),
      t('steps.pet'),
      t('steps.food')
    ]
    @current_step = 1
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
