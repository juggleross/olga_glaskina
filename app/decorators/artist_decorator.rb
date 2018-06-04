class ArtistDecorator < Draper::Decorator
  delegate_all

  def first_latter_from_name
    short_name[0]&.upcase
  end

  def short_name
    object&.full_name&.split(' ')&.last&.downcase
  end
end
