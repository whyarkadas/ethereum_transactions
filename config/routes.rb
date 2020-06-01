Rails.application.routes.draw do
  root 'transactions#index'
  resources :transactions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
