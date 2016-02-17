class RemoveTimestampsFromPages < ActiveRecord::Migration[5.0]
  def change
    remove_column :pages, :completed_at, :datetime
    remove_column :pages, :failed_at, :datetime
  end
end
