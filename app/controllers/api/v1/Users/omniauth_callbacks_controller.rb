class Api::V1::Users::OmniauthCallbacksController < Api::V1::BaseController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user
      if @user.sign_in_count.nil? || @user.sign_in_count == 1
        render json: { message: 'Signed in successfully. Please create profile.', user: @user }
      else
        render json: { message: 'Signed in successfully', user: @user }
      end
    else
      render json: { error: @user.errors.full_messages.join("\n") }, status: :unprocessable_entity
    end
  end

  def failure
    render json: { error: 'There was an error while trying to authenticate you...' }, status: :unprocessable_entity
  end
end

# class Api::V1::Users::OmniauthCallbacksController < Api::V1::BaseController
#   def google_oauth2
#     @user = User.from_omniauth(request.env['omniauth.auth'])

#     if @user.persisted?
#       sign_in @user
#       render json: { message: 'Signed in successfully', user: @user }
#     else
#       render json: { error: @user.errors.full_messages.join("\n") }, status: :unprocessable_entity
#     end
#   end

#   def failure
#     render json: { error: 'There was an error while trying to authenticate you...' }, status: :unprocessable_entity
#   end
# end
