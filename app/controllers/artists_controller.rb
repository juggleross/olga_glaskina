class ArtistsController < ApplicationController
	def show
	   @artworks = Project.where(global_name: params[:id])
	end
	def index 
		@artists = Artist.order(:short_name)
	end
end
