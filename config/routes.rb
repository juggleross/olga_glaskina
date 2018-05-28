Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'homes/example'
  get 'homes/about', as: :about
  get 'homes/contact', as: :contact
  get 'homes/project_home', as: :project_home
  
  root 'homes#index'

  resources :projects
  resources :artists
  resources :homes
end
