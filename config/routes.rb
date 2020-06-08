Rails.application.routes.draw do
  root 'transactions#index'
  resources :transactions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users
  resources :comments
  post 'authenticate', to: 'authentication#authenticate'
  post 'login', to: 'authentication#login'
  post 'auto_login', to: 'authentication#auto_login'
  post 'transaction_comments', to: 'comments#transaction_comments'
  get '*path' => redirect('/')

  mount ActionCable.server => '/cable'
end
