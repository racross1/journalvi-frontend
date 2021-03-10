import React, { Component } from "react";
import { connect } from 'react-redux';
import { setUser } from '../actions/users.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUpForm extends Component {

    state = {
        user: {
            username: "", 
            password: ""
        }
    }

    handleChangeUsername = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                username: e.target.value
            }
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                password: e.target.value
            }
        })
    }

    handleChangeTag = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                tagline: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        let newUser = this.state.user
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.error === "failed to create user") {
                alert("Username not available")
            } else {
                sessionStorage.setItem('token', user.jwt)
                this.props.setUser(user)
                this.props.handleLogin()
            }
        })
    }
    render() {
        return (
            <div className="sign-up">
                <Form id='signup-form' onSubmit={(e) => this.handleSubmit(e)}>
                <h5>Please Sign In</h5>
                
                <Form.Group controlId="signup-form-username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control size='sm' onChange={(e) => this.handleChangeUsername(e)} type="text" className="form-control" placeholder="Enter Username" />
                </Form.Group>
                
                <Form.Group controlId="singup-form-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size='sm' onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                </Form.Group>
                
                <Button type="submit">Sign Up</Button><br></br>

            </Form>

            <Button  onClick={this.props.showRegisterForm}>Already registered?</Button>
                
            </div> 
        );
    }
}

export default connect(null, {setUser})(SignUpForm)