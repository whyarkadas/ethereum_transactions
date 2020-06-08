class AuthenticationController < ApplicationController
  #skip_before_action :authenticate_request,  only: 'authenticate', raise: false
  #skip_before_action :authenticate_request
  skip_before_action :verify_authenticity_token

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])

    if command.success?
      render json: { result: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  # skip_before_action :require_login, only: [:login, :auto_login]
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      payload = { user_id: user.id }
      token = JsonWebToken::encode(payload)
      render json: { user: user, jwt: token, success: 'Welcome back' }
    else
      render json: { failure: "Log in failed! Username or password invalid!" }
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: { errors: "No User Logged In" }
    end
  end

  def user_is_authed
    render json: { message: "You are authorized" }
  end
end
