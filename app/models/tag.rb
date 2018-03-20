class Tag < ApplicationRecord
  SEPARATOR = ","
  validates_format_of :name, without: Regexp.new(SEPARATOR)

  has_and_belongs_to_many :bookmark
  def self.from_str(str)
    names = (str or "").split(SEPARATOR).map(&:strip).select{|s| !s.blank?}
    tags = Set.new(names.map {|name| Tag.find_or_create_by!(name: name)}).to_a
    tags
  end
end
