module Api
  module V1
    class EventsController < BaseController
      before_action :set_pet
      before_action :set_event, only: [:edit, :update, :remove_image, :destroy]

      def new
        @event = @pet.events.build
        render json: @event
      end

      def create
        @event = @pet.events.build(event_params)
        if @event.save
          render json: @event, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      def show_by_date
        @date = params[:date].to_date
        @events = @pet.events.where(date: @date)
        render json: @events
      end

      def edit
        render json: @event
      end

      def update
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
          render json: { status: 'success', event: @event }
        else
          render json: { status: 'error', errors: @event.errors.full_messages }, status: :unprocessable_entity
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
        @event.destroy
        render json: { status: 'success' }
      end

      def delete_by_date
        @date = params[:date].to_date
        @pet.events.where(date: @date).destroy_all
        render json: { status: 'success' }
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
  end
end
