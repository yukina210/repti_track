module Api
  module V1
    class HomeController < BaseController
      def welcome
        render json: { message: "Welcome to the API" }
      end
    end
  end
end
