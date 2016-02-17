class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.boolean :processing, default: true, null: false
      t.text :url
      t.text :og_image_url
      t.text :title
      t.text :description
      t.string :accent_color

      t.timestamps
    end
  end
end
