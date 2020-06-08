module Comments
	class CommentSerializer < ActiveModel::Serializer
		attributes :text, :created_at, :username

		def username
			object.user.first_name + ' ' + object.user.last_name
		end
	end
end