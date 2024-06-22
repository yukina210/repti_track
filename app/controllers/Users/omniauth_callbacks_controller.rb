class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in @user
      if @user.sign_in_count.nil? || @user.sign_in_count == 1
        redirect_to new_profile_path, event: :authentication
      else
        redirect_to dashboard_path, event: :authentication
      end
    else
      session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
  end

  def failure
    flash[:error] = 'There was an error while trying to authenticate you...'
    redirect_to new_user_session_path
  end
end

# class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
#   def google_oauth2
#     @user = User.from_omniauth(request.env['omniauth.auth'])

#     if @user.persisted?
#       sign_in_and_redirect @user
#     else
#       session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
#       redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
#     end
#   end

#   def failure
#     flash[:error] = 'There was an error while trying to authenticate you...'
#     redirect_to new_user_session_path
#   end
# end
