# app/controllers/api/v1/dashboard_controller.rb
class Api::V1::DashboardController < Api::V1::BaseController
  def index
    @pets = current_user.pets

    if @pets.present?
      @selected_pet = params[:selected_pet_id].present? ? current_user.pets.find(params[:selected_pet_id]) : @pets.first

      # デフォルトの開始日と終了日を設定
      @start_date = params[:start_date].present? ? Date.parse(params[:start_date]) : Date.today - 30.days
      @end_date = params[:end_date].present? ? Date.parse(params[:end_date]) : Date.today

      # グラフの表示期間を設定
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

      # 体重データを取得
      @weight_data = [
        {
          pet_id: @selected_pet.id,
          name: @selected_pet.pet_name,
          data: @selected_pet.weight_records.where(date: @start_date..@end_date).order(date: :asc).map do |record|
            { x: record.date.strftime("%Y-%m-%d"), y: record.weight, id: record.id }
          end
        }
      ]

      # カレンダー用イベントデータを取得（デフォルトは当月）
      @calendar_start_date = Date.today.beginning_of_month
      @calendar_end_date = Date.today.end_of_month

      @events_by_date = initialize_records_hash
      @selected_pet.events.where(date: @calendar_start_date..@calendar_end_date).each do |event|
        @events_by_date[event.date] << event
      end

      render json: {
        pets: @pets.as_json(only: [:id, :pet_name]),
        selected_pet: @selected_pet.as_json(only: [:id, :pet_name]),
        weight_data: @weight_data,
        events_by_date: @events_by_date.transform_values { |events| events.map { |e| e.as_json(only: [:id, :date, :event_types, :note]) } }
      }
    else
      render json: { message: 'No pets found' }, status: :not_found
    end
  end

  private

  def initialize_records_hash
    Hash.new { |hash, key| hash[key] = [] }
  end
end
