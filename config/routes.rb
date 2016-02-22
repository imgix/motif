Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :pages, only: [:create, :show]
  delete 'pages/:url', to: 'pages#destroy', constraints: { url: /[^\s]+/ }

  get 'i', to: 'images#show'
end
