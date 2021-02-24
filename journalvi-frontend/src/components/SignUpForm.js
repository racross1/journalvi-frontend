import React, { Component } from "react";
import { connect } from 'react-redux';
import { setUser } from '../actions/users.js';

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
        // .then(registeredUser => {
        //     sessionStorage.setItem('token', registeredUser.jwt)
        //     this.props.handleUserSession(registeredUser)
        // })
        // .then(user => {
        //     sessionStorage.setItem('token', user.jwt)
        //     this.props.setUser(user)
        //     this.props.handleLogin()
        // })
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
                <form onSubmit={(e) => this.handleSubmit(e)} >
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input onChange={(e) => this.handleChangeUsername(e)} type="text" className="form-control" placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                    </div>

    
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button><br></br>
                </form>

             <button  onClick={this.props.showRegisterForm} className="btn btn-primary btn-block">Already registered?</button>
            
            </div> 
        );
    }
}

export default connect(null, {setUser})(SignUpForm)