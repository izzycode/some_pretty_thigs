Rails.application.routes.draw do
  resources :events, only: [:index, :create]
  root 'events#index'
end
