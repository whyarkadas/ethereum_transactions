class CommentsController < ApplicationController
  protect_from_forgery
  def transaction_comments
    @comments = Comment.where(transaction_id: params[:transaction_id])
    respond_to do |format|
      format.html { @comments }
      format.json do
        render json: @comments, each_serializer: Comments::CommentSerializer
      end
    end
  end

  def create
    @comment = Comment.new(comment_params)
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @comment, notice: 'Comment was successfully created.' }
        format.json do
          render json: @comment, serializer: Comments::CommentSerializer
        end
      else
        format.html { render :new }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :transaction_id, :text)
  end
end