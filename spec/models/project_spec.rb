require 'rails_helper'

RSpec.describe Project, type: :model do
  context 'validations' do
    describe '#image_cloud' do
      let!(:project) { FactoryBot.create(:project) }

      it 'is uniqueness' do
        project_new = Project.new(image_cloud: project.image_cloud)
        expect(project_new.valid?).to be false
      end
    end
  end
end
