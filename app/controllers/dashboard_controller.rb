class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @pets = current_user.pets

    if @pets.present?
      @selected_pet = params[:selected_pet_id].present? ? current_user.pets.find(params[:selected_pet_id]) : @pets.first

      @start_date = params[:start_date].present? ? Date.parse(params[:start_date]) : Date.today - 30.days
      @end_date = params[:end_date].present? ? Date.parse(params[:end_date]) : Date.today
      @time_range = params[:time_range]

      if @time_range.present?
        case @time_range
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

      @weight_data = [
        {
          pet_id: @selected_pet.id,
          name: @selected_pet.pet_name,
          data: @selected_pet.weight_records.where(date: @start_date..@end_date).order(date: :asc).map do |record|
            { x: record.date.strftime("%Y-%m-%d"), y: record.weight, id: record.id }
          end
        }
      ]

      @events_by_date = initialize_records_hash
      @selected_pet.events.each do |event|
        @events_by_date[event.date] << event
      end
    else
      @selected_pet = nil
    end
    
    Rails.logger.debug { "@weight_data: #{@weight_data.inspect}" }
  end

  private

  def initialize_records_hash
    Hash.new { |hash, key| hash[key] = [] }
  end
end
