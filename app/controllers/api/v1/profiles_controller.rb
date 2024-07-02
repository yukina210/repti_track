module Api
  module V1
    class ProfilesController < BaseController
      before_action :authenticate_user!

      def new
        @profile = current_user.build_profile
        render json: {
          profile: @profile,
          steps: [
            t('steps.profile'),
            t('steps.pet'),
            t('steps.food')
          ],
          current_step: 2
        }
      end

      def create
        @profile = current_user.build_profile(profile_params)
        if @profile.save
          render json: { profile: @profile, next_path: new_pet_path }, status: :created
        else
          render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        @profile = current_user.profile
        render json: @profile
      end

      def edit
        @profile = current_user.profile
        render json: @profile
      end

      def update
        @profile = current_user.profile
        if @profile.update(profile_params)
          render json: @profile
        else
          render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def profile_params
        params.require(:profile).permit(:username, :gender, :avatar, :avatar_cache, "date_of_birth(1i)", "date_of_birth(2i)", "date_of_birth(3i)")
      end
    end
  end
end
