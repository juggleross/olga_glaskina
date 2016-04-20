class HomesController < ApplicationController
  def index
    @home_projects = HomeProject.all
  end

  def about
  end

  def contact
  end

  def project_home
  	@home_projects = HomeProject.all
  end

end
