class UsersController < ApplicationController
  before_action :find_user, except: %i[create index]
  protect_from_forgery
  # GET /users
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /users/{username}
  def show
    render json: @user, status: :ok
  end

  def create
    user = User.create(user_params)
    if user.valid?
      payload = { user_id: user.id }
      token = JsonWebToken::encode(payload)
      render json: { user: user, jwt: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :not_acceptable
    end
  end

  # PUT /users/{username}
  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # DELETE /users/{username}
  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_username!(params[:_username])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: 'User not found' }, status: :not_found
  end

  def user_params
    params.permit(
      :first_name, :last_name, :email, :password, :password_confirmation
    )
  end
end