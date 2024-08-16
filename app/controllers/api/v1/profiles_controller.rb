# app/controllers/api/v1/profiles_controller.rb
class Api::V1::ProfilesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  before_action :authenticate_user!
  before_action :set_profile, only: [:show, :update, :destroy]

  # GET /api/v1/profiles
  def index
    @profiles = current_user.profiles
    render json: @profiles
  end

  # GET /api/v1/profiles/:id
  def show
    render json: @profile
  end

  # POST /api/v1/profiles
  def create
    @profile = current_user.build_profile(profile_params)
    if @profile.save
      render json: @profile, status: :created
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/profiles/:id
  def update
    if @profile.update(profile_params)
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/profiles/:id
  def destroy
    @profile.destroy
  end

  private

  def set_profile
    @profile = current_user.profile
  end

  def profile_params
    params.require(:profile).permit(:username, :gender, :avatar, :avatar_cache, "date_of_birth(1i)", "date_of_birth(2i)", "date_of_birth(3i)")
  end
end
