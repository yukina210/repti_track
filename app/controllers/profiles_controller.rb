class ProfilesController < ApplicationController
    before_action :authenticate_user!

    def new
        @profile = current_user.build_profile
        @steps = [
            t('steps.profile'),
            t('steps.pet'),
            t('steps.food')
        ]
        @current_step = 2
    end

    def create
        @profile = current_user.build_profile(profile_params)
        @steps = [
          t('steps.profile'),
          t('steps.pet'),
          t('steps.food')
        ]
        @current_step = 1
        if @profile.save
            redirect_to new_pet_path
        else
            render :new, status: :unprocessable_entity
        end
    end

    def show
        @profile = current_user.profile
    end

    def edit
        @profile = current_user.profile
    end

    def update
        @profile = current_user.profile
        if @profile.update(profile_params)
            redirect_to profile_path(@profile)
        else
            render :edit
        end
    end

    private

    def profile_params
        params.require(:profile).permit(:username, :gender, :avatar, :avatar_cache, "date_of_birth(1i)", "date_of_birth(2i)", "date_of_birth(3i)")
    end
end
