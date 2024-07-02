# frozen_string_literal: true

class Api::V1::Users::SessionsController < Api::V1::BaseController
  def create
    user = User.find_for_database_authentication(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(user)
      render json: { message: 'Signed in successfully', user: user }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user)
    render json: { message: 'Signed out successfully' }
  end
end
