Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :events, only: [:index]
  root 'events#index'
end
