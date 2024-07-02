class EventsController < ApplicationController
  before_action :set_pet
  before_action :set_event, only: [:edit, :update, :remove_image]

  def new
    @event = @pet.events.build
  end

  def create
    @event = @pet.events.build(event_params)
    if @event.save
      redirect_to dashboard_path(selected_pet_id: @pet.id)
    else
      render :new
    end
  end

  def show_by_date
    @date = params[:date].to_date
    @events = @pet.events.where(date: @date)
  end

  def edit
    @event = @pet.events.find(params[:id])
  end

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
      respond_to do |format|
        format.html { redirect_to dashboard_path(selected_pet_id: @pet.id) }
        format.json { render json: { status: 'success' } }
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.json { render json: { status: 'error' }, status: :unprocessable_entity }
      end
    end
  end


  def remove_image
    index = params[:index].to_i
    if index >= 0 && index < @event.images.length
      @event.images.delete_at(index)
      @event.images_will_change!
      if @event.save
        render json: { status: 'success' }
      else
        render json: { status: 'error' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'error' }, status: :unprocessable_entity
    end
  end

  def destroy
    @event = @pet.events.find(params[:id])
    @event.destroy
    redirect_to dashboard_path(selected_pet_id: @pet.id)
  end

  def delete_by_date
    @date = params[:date].to_date
    @pet.events.where(date: @date).destroy_all
    redirect_to dashboard_path(selected_pet_id: @pet.id)
  end

  private

  def set_pet
    @pet = Pet.find(params[:pet_id])
  end

  def set_event
    @event = @pet.events.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:date, :note, { images: [] }, event_types: [])
  end
end
