# app/controllers/api/v1/passwords_controller.rb
module Api
  module V1
    class PasswordsController < Devise::PasswordsController
      skip_before_action :verify_authenticity_token, only: [:create, :update]
      respond_to :json

      # POST /api/v1/users/password
      def create
        self.resource = resource_class.send_reset_password_instructions(resource_params)
        if successfully_sent?(resource)
          render json: { message: "Reset password instructions have been sent to #{resource.email}" }, status: :ok
        else
          render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT /api/v1/users/password
      def update
        self.resource = resource_class.reset_password_by_token(resource_params)
        if resource.errors.empty?
          resource.unlock_access! if unlockable?(resource)
          if Devise.sign_in_after_reset_password
            resource.after_database_authentication
            sign_in(resource_name, resource)
            render json: { message: "Password has been reset successfully", user: resource }, status: :ok
          else
            render json: { message: "Password has been reset successfully" }, status: :ok
          end
        else
          render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      protected

      def after_resetting_password_path_for(resource)
        new_session_path(resource_name)
      end

      def after_sending_reset_password_instructions_path_for(resource_name)
        new_session_path(resource_name)
      end
    end
  end
end
