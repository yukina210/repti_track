module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      skip_before_action :verify_authenticity_token, only: [:create]
      respond_to :json

      def create
        build_resource(sign_up_params)

        if resource.save
          token = JwtService.encode(user_id: resource.id)
          render json: {
            message: 'Signed up successfully',
            user: resource.as_json(only: [:id, :email]),
            token: token,
            next_action: 'create_profile',  # This indicates the user should create a profile next
            profile_path: new_profile_path  # You may need to adjust this based on your routes
          }, status: :created
        else
          render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      protected

      def sign_up_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end

# # app/controllers/api/v1/registrations_controller.rb
# module Api
#   module V1
#     class RegistrationsController < Devise::RegistrationsController
#       skip_before_action :verify_authenticity_token, only: [:create]
#       respond_to :json

#       # POST /api/v1/users
#       def create
#         build_resource(sign_up_params)

#         resource.save
#         render_resource(resource)
#       end

#       protected

#       # Redirect to the user's profile page after sign up.
#       def after_sign_up_path_for(resource)
#         new_profile_path
#       end

#       def render_resource(resource)
#         if resource.errors.empty?
#           render json: resource
#         else
#           render json: resource.errors, status: :unprocessable_entity
#         end
#       end
#     end
#   end
# end
