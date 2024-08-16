# app/controllers/api/v1/weight_records_controller.rb
class Api::V1::WeightRecordsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  before_action :authenticate_user!
  before_action :set_pet, only: [:index, :create]
  before_action :set_weight_record, only: [:show, :update, :destroy]

  # GET /api/v1/pets/:pet_id/weight_records
  def index
    @weight_records = @pet.weight_records
    render json: @weight_records
  end

  # GET /api/v1/weight_records/:id
  def show
    render json: @weight_record
  end

  # POST /api/v1/pets/:pet_id/weight_records
  def create
    @weight_record = @pet.weight_records.build(weight_record_params)
    if @weight_record.save
      render json: @weight_record, status: :created
    else
      render json: @weight_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/weight_records/:id
  def update
    if @weight_record.update(weight_record_params)
      render json: @weight_record
    else
      render json: @weight_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/weight_records/:id
  def destroy
    @weight_record.destroy
    head :no_content
  end

  private

  def set_pet
    @pet = current_user.pets.find(params[:pet_id])
  end

  def set_weight_record
    @weight_record = WeightRecord.find(params[:id])
  end

  def weight_record_params
    params.require(:weight_record).permit(:weight, :date)
  end
end
