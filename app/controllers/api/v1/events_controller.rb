# app/controllers/api/v1/events_controller.rb
class Api::V1::EventsController < Api::V1::BaseController
  before_action :set_pet
  before_action :set_event, only: [:show, :update, :destroy, :remove_image]

  # GET /api/v1/pets/:pet_id/events
  def index
    @events = @pet.events
    render json: @events
  end

  # GET /api/v1/events/:id
  def show
    render json: @event
  end

  # GET /api/v1/pets/:pet_id/events/date/:date
  def show_by_date
    @date = params[:date].to_date
    @events = @pet.events.where(date: @date)
    render json: @events
  end

  # POST /api/v1/pets/:pet_id/events
  def create
    @event = @pet.events.build(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/events/:id
  def update
    # Handle image removals
    if params[:event][:remove_images].present?
      params[:event][:remove_images].each do |filename|
        image = @event.images.find { |img| img.file.filename.to_s == filename }
        image.remove! if image
      end
    end

    event_params_copy = event_params
    event_params_copy[:event_types] ||= []

    if event_params_copy[:images].present?
      new_images = event_params_copy[:images].reject(&:blank?)
      @event.images += new_images
    end
    event_params_copy.delete(:images)

    if @event.update(event_params_copy)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/events/:id
  def destroy
    @event.destroy
    head :no_content
  end

  # DELETE /api/v1/pets/:pet_id/events/date/:date
  def delete_by_date
    @date = params[:date].to_date
    @pet.events.where(date: @date).destroy_all
    head :no_content
  end

  private

  def set_pet
    @pet = current_user.pets.find(params[:pet_id])
  end

  def set_event
    @event = @pet.events.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:date, :note, { images: [] }, event_types: [])
  end
end
