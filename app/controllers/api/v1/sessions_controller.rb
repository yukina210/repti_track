module Api
  module V1
    class SessionsController < Devise::SessionsController
      skip_before_action :verify_authenticity_token, only: [:create, :destroy]
      respond_to :json

      def create
        user = User.find_by(email: params[:user][:email])

        if user&.valid_password?(params[:user][:password])
          token = JwtService.encode(user_id: user.id)
          render json: {
            message: 'Signed in successfully',
            user: user.as_json(only: [:id, :email]),
            token: token,
            next_action: 'go_to_dashboard',  # This indicates the user should go to the dashboard
            dashboard_path: dashboard_path  # You may need to adjust this based on your routes
          }, status: :ok
        else
          render json: { error: 'Invalid Email or Password' }, status: :unauthorized
        end
      end

      def destroy
        # JWT are stateless, so no server-side logout is needed
        render json: { message: 'Signed out successfully' }, status: :ok
      end
    end
  end
end

# # app/controllers/api/v1/sessions_controller.rb
# module Api
#   module V1
#     class SessionsController < Devise::SessionsController
#       skip_before_action :verify_authenticity_token, only: [:create, :destroy]
#       respond_to :json

#       # POST /api/v1/users/sign_in
#       def create
#         user = User.find_by(email: params[:user][:email])

#         if user&.valid_password?(params[:user][:password])
#           sign_in(user)
#           render json: { message: 'Signed in successfully', user: user, redirect_url: after_sign_in_path_for(user) }, status: :ok
#         else
#           render json: { error: 'Invalid Email or Password' }, status: :unauthorized
#         end
#       end

#       # DELETE /api/v1/users/sign_out
#       def destroy
#         super do
#           render json: { message: 'Signed out successfully' }, status: :ok and return
#         end
#       end

#       protected

#       def after_sign_in_path_for(resource)
#         dashboard_path
#       end
#     end
#   end
# end
