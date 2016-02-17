class AddFetchedAtToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :fetched_at, :datetime
  end
end
