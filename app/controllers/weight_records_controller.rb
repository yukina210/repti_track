class WeightRecordsController < ApplicationController
    before_action :set_pet, only: [:new, :create, :edit, :update, :destroy]
    before_action :set_weight_record, only: [:edit, :update, :destroy]

    def new
      @weight_record = @pet.weight_records.build
    end

    def create
      @weight_record = @pet.weight_records.build(weight_record_params)
      if @weight_record.save
        redirect_to dashboard_path(selected_pet_id: @pet.id)
      else
        render :new
      end
    end

    def edit
    end

    def update
      if @weight_record.update(weight_record_params)
        redirect_to dashboard_path(selected_pet_id: @pet.id)
      else
        render :edit
      end
    end

    def destroy
      @weight_record.destroy
      redirect_to dashboard_path(selected_pet_id: @pet.id)
    end

    private

    def set_pet
      @pet = Pet.find(params[:pet_id])
    end

    def set_weight_record
      logger.debug "params[:id]: #{params[:id]}"
      @weight_record = @pet.weight_records.find(params[:id])
    end

    def weight_record_params
      params.require(:weight_record).permit(:weight, :date)
    end
end