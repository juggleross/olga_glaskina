module ArtistsHelper
	def first_letters_from_name_set(artists)
	  artists.map {|artist| artist.short_name[0].upcase }.uniq.sort
	end
end
