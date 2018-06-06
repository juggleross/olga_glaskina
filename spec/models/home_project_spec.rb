require 'rails_helper'

RSpec.describe HomeProject, type: :model do
  context 'validations' do
    describe '#short_photo_type' do
      let!(:home_project) { FactoryBot.create(:home_project) }

      it 'is uniqueness' do
        home_project_new = HomeProject.new(short_photo_type: home_project.short_photo_type)
        expect(home_project_new.valid?).to be false
      end
    end
  end
end
