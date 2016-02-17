class AddTimestampsToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :completed_at, :datetime
    add_column :pages, :failed_at, :datetime
  end
end
