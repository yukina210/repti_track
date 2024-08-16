# app/controllers/api/v1/registrations_controller.rb
module Api
  module V1
    class RegistrationsController < Devise::RegistrationsController
      skip_before_action :verify_authenticity_token, only: [:create]
      respond_to :json

      # POST /api/v1/users
      def create
        build_resource(sign_up_params)

        resource.save
        render_resource(resource)
      end

      protected

      # Redirect to the user's profile page after sign up.
      def after_sign_up_path_for(resource)
        new_profile_path
      end

      def render_resource(resource)
        if resource.errors.empty?
          render json: resource
        else
          render json: resource.errors, status: :unprocessable_entity
        end
      end
    end
  end
end
