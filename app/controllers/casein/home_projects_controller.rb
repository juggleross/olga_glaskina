# Scaffolding generated by Casein v5.1.1.5

module Casein
  class HomeProjectsController < Casein::CaseinController
  
    ## optional filters for defining usage according to Casein::AdminUser access_levels
    # before_filter :needs_admin, :except => [:action1, :action2]
    # before_filter :needs_admin_or_current_user, :only => [:action1, :action2]
  
    def index
      @casein_page_title = 'Home projects'
  		@home_projects = HomeProject.order(sort_order(:photo_type_id)).paginate :page => params[:page]
    end
  
    def show
      @casein_page_title = 'View home project'
      @home_project = HomeProject.find params[:id]
    end
  
    def new
      @casein_page_title = 'Add a new home project'
    	@home_project = HomeProject.new
    end

    def create
      @home_project = HomeProject.new home_project_params
    
      if @home_project.save
        flash[:notice] = 'Home project created'
        redirect_to casein_home_projects_path
      else
        flash.now[:warning] = 'There were problems when trying to create a new home project'
        render :action => :new
      end
    end
  
    def update
      @casein_page_title = 'Update home project'
      
      @home_project = HomeProject.find params[:id]
    
      if @home_project.update_attributes home_project_params
        flash[:notice] = 'Home project has been updated'
        redirect_to casein_home_projects_path
      else
        flash.now[:warning] = 'There were problems when trying to update this home project'
        render :action => :show
      end
    end
 
    def destroy
      @home_project = HomeProject.find params[:id]

      @home_project.destroy
      flash[:notice] = 'Home project has been deleted'
      redirect_to casein_home_projects_path
    end
  
    private
      
      def home_project_params
        params.require(:home_project).permit(:photo_type_id, :title, :photo_type, :short_photo_type, :date, :image_cloud, :image_cloud_thumb)
      end

  end
end