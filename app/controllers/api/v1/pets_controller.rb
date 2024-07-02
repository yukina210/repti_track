module Api
  module V1
    class PetsController < BaseController
      before_action :authenticate_user!
      before_action :set_pet, only: [:show, :edit, :update, :destroy]

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

      def show
        render json: @pet
      end

      def autocomplete
        normalized_search = normalize_search_query(params[:query])
        search_terms = normalized_search.split(' ')
        conditions = search_terms.map { |term| '(pet_name LIKE ? OR category::text LIKE ? OR gender::text LIKE ? OR breed LIKE ?)' }.join(' AND ')
        values = search_terms.map { |term| ["%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%"] }.flatten
        results = current_user.pets.where(conditions, *values).pluck(:pet_name, :category, :gender, :breed).uniq
        render json: results.flatten
      end

      def create
        @pet = current_user.pets.new(pet_params)
        if @pet.save
          render json: @pet, status: :created
        else
          render json: { errors: @pet.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @pet.update(pet_params)
          render json: @pet
        else
          render json: { errors: @pet.errors.full_messages }, status: :unprocessable_entity
        end
      end

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
  end
end
