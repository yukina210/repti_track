class ChangeEventTypeToStringInEvents < ActiveRecord::Migration[7.1]
  def up
    add_column :events, :event_type_backup, :string

    # Backup existing event_type values as strings
    Event.reset_column_information
    Event.find_each do |event|
      event.update_column(:event_type_backup, event.event_type_before_type_cast.to_s)
    end

    change_column :events, :event_type, :string

    # Restore the backed up values
    Event.find_each do |event|
      event.update_column(:event_type, event.event_type_backup)
    end

    remove_column :events, :event_type_backup
  end

  def down
    add_column :events, :event_type_backup, :integer

    # Backup existing event_type values as integers
    Event.reset_column_information
    Event.find_each do |event|
      event.update_column(:event_type_backup, event.event_type.to_i)
    end

    change_column :events, :event_type, :integer, using: 'event_type::integer'

    # Restore the backed up values
    Event.find_each do |event|
      event.update_column(:event_type, event.event_type_backup)
    end

    remove_column :events, :event_type_backup
  end
end
