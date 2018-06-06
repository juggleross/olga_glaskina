class ProjectsController < ApplicationController
  def show
  	@artworks = Project.where(global_name: params[:id])
  	@home_project = HomeProject.where(short_photo_type: params[:id])

    set_meta_tags title: @home_project.title,
                  keywords: "your keywords",
                  description: "your description"
  end
end
