require 'rails_helper'

RSpec.describe Artist, type: :model do
  context 'validations' do
    describe '#image_cloud' do
      let!(:artist) { FactoryBot.create(:artist) }

      it 'is uniqueness' do
        artist_new = Artist.new(image_cloud: artist.image_cloud)
        expect(artist_new.valid?).to be false
      end
    end
  end
end
