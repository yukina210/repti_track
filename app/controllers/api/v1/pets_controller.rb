# app/controllers/api/v1/pets_controller.rb
class Api::V1::PetsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  before_action :authenticate_user!
  before_action :set_pet, only: [:show, :update, :destroy]

  # GET /api/v1/pets
  def index
    @pets = current_user.pets
    if params[:search].present?
      normalized_search = normalize_search_query(params[:search])
      search_terms = normalized_search.split(' ')
      conditions = search_terms.map { |term| '(pet_name LIKE ? OR category::text LIKE ? OR gender::text LIKE ? OR breed LIKE ?)' }.join(' AND ')
      values = search_terms.map { |term| ["%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%"] }.flatten
      @pets = @pets.where(conditions, *values)
    end
    render json: @pets
  end

  # GET /api/v1/pets/autocomplete
  def autocomplete
    normalized_search = normalize_search_query(params[:query])
    search_terms = normalized_search.split(' ')
    conditions = search_terms.map { |term| '(pet_name LIKE ? OR category::text LIKE ? OR gender::text LIKE ? OR breed LIKE ?)' }.join(' AND ')
    values = search_terms.map { |term| ["%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%"] }.flatten
    results = current_user.pets.where(conditions, *values).pluck(:pet_name, :category, :gender, :breed).uniq
    render json: results.flatten
  end

  # POST /api/v1/pets
  def create
    @pet = current_user.pets.new(pet_params)
    if @pet.save
      render json: @pet, status: :created
    else
      render json: @pet.errors, status: :unprocessable_entity
    end
  end

  # GET /api/v1/pets/:id
  def show
    render json: @pet
  end

  # PATCH/PUT /api/v1/pets/:id
  def update
    if @pet.update(pet_params)
      render json: @pet
    else
      render json: @pet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/pets/:id
  def destroy
    @pet.destroy
    head :no_content
  end

  private

  def set_pet
    @pet = current_user.pets.find(params[:id])
  end

  def pet_params
    params.require(:pet).permit(:pet_avatar, :pet_name, :category, :gender, :breed, :pet_avatar_cache, "date_of_birth(1i)", "date_of_birth(2i)", "date_of_birth(3i)")
  end

  def normalize_search_query(query)
    query.gsub(/[[:space:]]+/, ' ').strip
  end
end

