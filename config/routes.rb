Rails.application.routes.draw do
  devise_for :users
  resources :events, only: [:index, :create, :destroy]
  root 'events#index'
end
