Rails.application.routes.draw do
  devise_for :users,
    controller: {
      omniauth_callbacks: 'users/omniauth_callbacks'
    }
  resources :events, only: [:index, :create, :destroy]
  root 'events#index'
end
