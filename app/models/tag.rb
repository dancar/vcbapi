class Tag < ApplicationRecord
  SEPARATOR = ","
  validates_format_of :name, without: Regexp.new(SEPARATOR)
  has_and_belongs_to_many :bookmark

  def to_s()
    name
  end
end
