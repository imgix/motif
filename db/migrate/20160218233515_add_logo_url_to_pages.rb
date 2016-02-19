class AddLogoUrlToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :logo_url, :text
  end
end
