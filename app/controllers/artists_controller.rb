class ArtistsController < ApplicationController
  def show
    @artworks = Project.where(global_name: params[:id])
  end

  def index
    @artists = ArtistDecorator.decorate_collection(Artist.all)
  end
end
