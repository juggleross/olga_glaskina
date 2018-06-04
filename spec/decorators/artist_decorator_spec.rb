require 'rails_helper'

RSpec.describe ArtistDecorator do
  describe '#first_latter_from_name' do
    let(:artist) { FactoryBot.create(:artist) }
    let(:decorated_artist) { artist.decorate }

    it 'returns the first letter from short_name' do
      expect(decorated_artist.first_latter_from_name).to eq decorated_artist.short_name[0].upcase
    end
  end

  describe '#short_name' do
    let(:artist) { FactoryBot.create(:artist) }
    let(:decorated_artist) { artist.decorate }

    it 'returns a correct short_name' do
      expect(decorated_artist.short_name).to eq artist.full_name.split(' ').last.downcase
    end
  end
end
