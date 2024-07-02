module Api
  module V1
    class WeightRecordsController < BaseController
      before_action :set_pet, only: [:new, :create, :edit, :update, :destroy]
      before_action :set_weight_record, only: [:edit, :update, :destroy]

      def new
        @weight_record = @pet.weight_records.build
        render json: @weight_record
      end

      def create
        @weight_record = @pet.weight_records.build(weight_record_params)
        if @weight_record.save
          render json: @weight_record, status: :created
        else
          render json: { errors: @weight_record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
        render json: @weight_record
      end

      def update
        if @weight_record.update(weight_record_params)
          render json: @weight_record
        else
          render json: { errors: @weight_record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @weight_record.destroy
        render json: { message: 'Weight record was successfully deleted.' }, status: :ok
      end

      private

      def set_pet
        @pet = Pet.find(params[:pet_id])
      end

      def set_weight_record
        @weight_record = @pet.weight_records.find(params[:id])
      end

      def weight_record_params
        params.require(:weight_record).permit(:weight, :date)
      end
    end
  end
end
