require 'rails_helper'

RSpec.describe ArtistDecorator do
  describe '#first_latter_from_name' do
    let(:artist) { FactoryBot.create(:artist) }
    let(:decorated_artist) { artist.decorate }

    it 'returns the first letter from short_name' do
      expect(decorated_artist.first_latter_from_name).to eq artist.short_name[0].upcase
    end
  end
end
