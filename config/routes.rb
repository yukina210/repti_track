Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  devise_scope :user do
    post '/users/auth/:provider', to: 'users/omniauth_callbacks#passthru', as: :user_omniauth_authorize
    match '/users/auth/:provider/callback', to: 'users/omniauth_callbacks#google_oauth2', via: [:get, :post], as: :user_omniauth_callback
  end

  # Profile routes
  resources :profiles, only: [:new, :create, :show, :edit, :update]

  # Pet routes
  resources :pets, only: [:index, :new, :create, :edit, :update, :destroy, :show] do
    collection do
      get :get_breeds
      get :autocomplete
    end

    # Nested weight records routes under a specific pet
    resources :weight_records, only: [:new, :create, :index, :edit, :update, :destroy]

    resources :events, except: [:show, :index] do
      collection do
        get 'show_by_date'
        delete 'delete_by_date'
      end

      member do
        delete 'remove_image'
      end
    end
  end

  # Question routes
  resources :questions do
    member do
      delete :remove_image
    end

    collection do
      get :drafts
      get :autocomplete
    end

    resources :answers, only: [:create, :edit, :update, :destroy] do
      resource :like, only: [:create, :destroy]
    end
  end

  # Notification routes
  resources :notifications, only: [:index, :show] do
    patch 'mark_as_read', on: :member
  end

  # Dashboard routes
  get 'dashboard', to: 'dashboard#index'
  get 'dashboard/select_pet', to: 'dashboard#select_pet'

  # Go to welcome page if not logged in.
  root "home#welcome"

  # API routes
  namespace :api do
    namespace :v1 do
      # devise_for :users, controllers: {
      #   confirmations: 'api/v1/users/confirmations',
      #   passwords: 'api/v1/users/passwords',
      #   registrations: 'api/v1/users/registrations',
      #   sessions: 'api/v1/users/sessions',
      #   omniauth_callbacks: 'api/v1/users/omniauth_callbacks',
      #   unlocks: 'api/v1/users/unlocks'
      # }

      # devise_scope :user do
      #   post '/users/auth/:provider', to: 'users/omniauth_callbacks#passthru', as: :user_omniauth_authorize
      #   match '/users/auth/:provider/callback', to: 'users/omniauth_callbacks#google_oauth2', via: [:get, :post], as: :user_omniauth_callback
      # end

      resources :profiles, only: [:new, :create, :show, :edit, :update]
      resources :pets, only: [:index, :new, :create, :edit, :update, :destroy, :show] do
        collection do
          get :get_breeds
          get :autocomplete
        end

        resources :weight_records, only: [:new, :create, :index, :edit, :update, :destroy]
        resources :events, except: [:show, :index] do
          collection do
            get 'show_by_date'
            delete 'delete_by_date'
          end

          member do
            delete 'remove_image'
          end
        end
      end

      resources :questions do
        member do
          delete :remove_image
        end

        collection do
          get :drafts
          get :autocomplete
        end

        resources :answers, only: [:create, :edit, :update, :destroy] do
          resource :like, only: [:create, :destroy]
        end
      end

      resources :notifications, only: [:index, :show] do
        patch 'mark_as_read', on: :member
      end

      get 'dashboard/weight_graph', to: 'dashboard#weight_graph'
      get 'dashboard/care_calendar', to: 'dashboard#care_calendar'

      get 'home/welcome', to: 'home#welcome'
    end
  end
end
