module PetsHelper
    def gender_in_japanese(gender)
      case gender
      when "male"
        "男の子"
      when "female"
        "女の子"
      else
        "不明"
      end
    end
end