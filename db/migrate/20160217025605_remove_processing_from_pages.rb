class RemoveProcessingFromPages < ActiveRecord::Migration[5.0]
  def change
    remove_column :pages, :processing, :boolean
  end
end
