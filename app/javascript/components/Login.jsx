import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

import { authenticateUser, autoLogin } from '../api/users';
import { withCookies } from 'react-cookie';
import './Login.scss'

class Login extends Component {

  state = {
    email: "",
    password: "",
    error: ""
  };

  onChangeEmail(value) {
    this.setState({ email: value });
  }

  onChangePassword(value) {
    this.setState({ password: value });
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token){
      autoLogin(token)
      .then(data => {        
        this.props.history.push("/home")}
      ).catch(err => {
        console.log("authUser error", { err });
        this.setState({ error: err })
      });
    }
  }
  
  authUser = () => {
    const { email, password } = this.state
    //this.props.clearLoginError();
    //this.props.authUserStarted();
    authenticateUser(email, password).then(      
      data => {
        if(data.failure){
          this.setState({ error: data.failure })
        }
        else {
          this.authFroward(data)
        }
        //localStorage.setItem("token", data.jwt)
        //props.handleLogin(data.user)
        //this.props.history.push("/home")
    }).catch(err => {
      console.log("authUser error", { err });
      this.setState({ error: err })
    });
    this.setState({ email: "" })
    this.setState({ password: "" })
    document.getElementById("login-form").reset();
  }

  authFroward(data) {
    const { cookies } = this.props;
    const { error } = this.state;

    if (error === "") {
      localStorage.setItem("token", data.jwt);
      //cookies.set('token', user_data.fetchToken, { path: '/' });
      //cookies.set('user_name', user_data.userInfo.full_name, {path: '/'});
      cookies.set('userId', data.user.id, {path: '/'});  
      this.props.history.push("/home")
    }
  }

  render() {
    let { error } = this.state    
    let errorMessage = this.state.error
      
    if (error.length > 0) {
      errorMessage = <Message negative>
        <Message.Header>ERROR</Message.Header>
        <p>Invalid email or password</p>
      </Message>
    }
  
    return (
      <div className="login-form">
        <Grid
          //textAlign="center"
          /*style={{ height: "100%" }}
          style={{ weight: "100%" }}
          //verticalAlign="middle"*/
        >
          <Grid.Column width={5} floated='center' >
            <Header as="h2" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" id="login-form">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e =>
                    this.onChangeEmail(e.target.value)
                  }
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"                  
                  onChange={e =>
                    this.onChangePassword(e.target.value)
                  }
                />

                <Button                  
                  fluid
                  size="large"
                  color='blue'
                  onClick={(e) => {
                    this.authUser();
                  }}
                >
                  Login to account
                </Button>
              </Segment>
            </Form>
            <Message>              
              <Button variant="btn btn-success" size="medium" color='orange' onClick={() => this.props.history.push("/signup")}>Sign Up</Button>
            </Message>
            {errorMessage}            
          </Grid.Column>
        </Grid>
      </div>
    );
    
  }
}

/*
const mapStateToProps = (state, ownProps) => {
  const { userInfo, error, authUserGoingOn } = state.user;
  return ({ userInfo, cookies: ownProps.cookies, error, authUserGoingOn });
};

export default withCookies(connect(
  mapStateToProps,
  //{ fetchUser, onChangeText, authUserWithFetch, loginHasError, clearLoginError, authUserStarted }
  { clearLoginError, authUserStarted }
)(Login));
*/

export default withCookies(Login)

