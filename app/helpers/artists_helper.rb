module ArtistsHelper
	def first_letters_from_name_set(artists)
	  artists.map { |artist| artist.first_latter_from_name }.uniq.sort
	end
end
