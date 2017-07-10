class HomesController < ApplicationController
  def index
    @home_projects = HomeProject.order(:photo_type_id)
  end

  def about
  end

  def contact
  end

  def project_home
    @home_projects = HomeProject.order(:photo_type_id)
  end

end
