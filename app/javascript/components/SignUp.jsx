import React, {useState} from 'react'
import { createUser } from '../api/users';
import {
  Button,
  Form,
  Grid,
  Header, Icon,
  Message,
  Segment
} from "semantic-ui-react";

function SignInForm(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleFirstNameChange = (e) => {
      setFirstName(e)
    }
    const handleLastNameChange = (e) => {
      setLastName(e)
    }
    const handleEmailChange = (e) => {
      setEmail(e)
    }
    const handlePasswordChange = (e) => {
      setPassword(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(
          firstName,
          lastName,
          email,
          password
        ).then(data => {
            localStorage.setItem("token", data.jwt)
            props.history.push("/home")            
        })
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
    }
    /*
    return(
        <div style={formDivStyle}>
            <h1>Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>First Name</label>
                    <input value={firstname} onChange={handleFirstnameChange} type="text" placeholder="firstname"/>
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input value={lastname} onChange={handleLastnameChange} type="text" placeholder="lastname"/>
                </div>
                <div className="field">
                    <label>E-Mail</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )*/

    return (
      <div className="login-form">
        <Grid
          /*textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"*/
        >
          <Grid.Column width={5} floated='center'>
            <Header as="h2" textAlign="center">
              Sign Up
            </Header>
            <Form size="large" id="login-form">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First name"
                  onChange={e =>
                    handleFirstNameChange(e.target.value)
                  }
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last name"
                  onChange={e =>
                    handleLastNameChange(e.target.value)
                  }
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e =>
                    handleEmailChange(e.target.value)
                  }
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"                  
                  onChange={e =>
                    handlePasswordChange(e.target.value)
                  }
                />

                <Button                  
                  fluid
                  size="large"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Create Account
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
}

export default SignInForm