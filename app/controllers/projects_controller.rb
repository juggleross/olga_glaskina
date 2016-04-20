class ProjectsController < ApplicationController
  def show
  	@artworks = Project.where(global_name: params[:id])
  	@home_project = HomeProject.where(short_photo_type: params[:id])
  end
end
