class Page < ApplicationRecord
  validates :url, presence: true, url: { no_local: true }
end
