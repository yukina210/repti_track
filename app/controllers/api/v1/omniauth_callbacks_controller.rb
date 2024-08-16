# app/controllers/api/v1/omniauth_callbacks_controller.rb
module Api
  module V1
    class OmniauthCallbacksController < Devise::OmniauthCallbacksController
      skip_before_action :verify_authenticity_token, only: [:google_oauth2, :failure]
      respond_to :json

      def google_oauth2
        @user = User.from_omniauth(request.env['omniauth.auth'])

        if @user.persisted?
          sign_in @user
          redirect_url = @user.sign_in_count.nil? || @user.sign_in_count == 1 ? new_profile_path : dashboard_path
          render json: { message: 'Authenticated successfully', user: @user, redirect_url: redirect_url }, status: :ok
        else
          session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
          render json: { error: @user.errors.full_messages.join("\n") }, status: :unprocessable_entity
        end
      end

      def failure
        render json: { error: 'There was an error while trying to authenticate you' }, status: :unauthorized
      end
    end
  end
end
