class AddLastRunErroredToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :last_run_errored, :boolean, default: false, null: false
  end
end
