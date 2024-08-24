module Api
  module V1
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!

      private

      def authenticate_user!
        header = request.headers['Authorization']
        Rails.logger.debug "Auth header: #{header}"
        
        if header
          token = header.split(' ').last
          begin
            decoded = JwtService.decode(token)
            
            if decoded
              @current_user = User.find_by(id: decoded[:user_id])
              if @current_user
                Rails.logger.debug "Authenticated user: #{@current_user.id}"
                return
              end
            end
          rescue JWT::DecodeError => e
            Rails.logger.error "JWT decode error: #{e.message}"
          end
        end
      
        Rails.logger.error "Authentication failed"
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
end