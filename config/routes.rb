Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	namespace :casein do
		resources :artists
		resources :home_projects
		resources :projects
	end

  get 'homes/example'
  get 'homes/about', as: :about
  get 'homes/contact', as: :contact
  get 'homes/project_home', as: :project_home



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'homes#index'

  resources :projects
  resources :artists
  resources :homes
end
