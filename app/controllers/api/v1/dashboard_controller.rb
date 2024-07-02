module Api
  module V1
    class DashboardController < BaseController
      before_action :authenticate_user!
      before_action :set_pets

      def weight_graph
        if @pets.present?
          @selected_pet = find_selected_pet

          set_date_range(params[:time_range])
          @weight_data = build_weight_data(@selected_pet)

          render json: @weight_data
        else
          render json: { message: "No pets available" }, status: :not_found
        end
      end

      def care_calendar
        if @pets.present?
          @selected_pet = find_selected_pet

          set_current_month_date_range
          @events_by_date = build_events_by_date(@selected_pet)
          render json: @events_by_date
        else
          render json: { message: "No pets available" }, status: :not_found
        end
      end

      private

      def set_pets
        @pets = current_user.pets
      end

      def find_selected_pet
        params[:selected_pet_id].present? ? current_user.pets.find(params[:selected_pet_id]) : @pets.first
      end

      def set_date_range(time_range)
        @end_date = params[:end_date].present? ? Date.parse(params[:end_date]) : Date.today
        @start_date = params[:start_date].present? ? Date.parse(params[:start_date]) : (@selected_pet.weight_records.minimum(:date) || Date.today - 90.days)
        @start_date = [@start_date, @end_date - 90.days].max

        if time_range.present?
          case time_range
          when 'week'
            @start_date = Date.today - 1.week
          when 'month'
            @start_date = Date.today - 1.month
          when 'half_year'
            @start_date = Date.today - 6.months
          when 'year'
            @start_date = Date.today - 1.year
          when 'all'
            @start_date = @selected_pet.weight_records.minimum(:date) || Date.today - 10.years
          end
        end
      end

      def set_current_month_date_range
        current_date = Date.today
        @start_date = current_date.beginning_of_month
        @end_date = current_date.end_of_month
      end

      def build_weight_data(pet)
        [
          {
            pet_id: pet.id,
            name: pet.pet_name,
            data: pet.weight_records.where(date: @start_date..@end_date).order(date: :asc).map do |record|
              { x: record.date.strftime("%Y-%m-%d"), y: record.weight, id: record.id }
            end
          }
        ]
      end

      def build_events_by_date(pet)
        events_by_date = initialize_records_hash
        pet.events.where(date: @start_date..@end_date).each do |event|
          events_by_date[event.date] << event
        end
        events_by_date
      end

      def initialize_records_hash
        Hash.new { |hash, key| hash[key] = [] }
      end
    end
  end
end
