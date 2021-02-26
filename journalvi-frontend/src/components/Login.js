import React from "react";
import { connect } from 'react-redux';
import { setUser } from '../actions/users.js';
import { populateEntries } from '../actions/entries.js'

class Login extends React.Component {

    state = {
            username: "", 
            password: ""
    }

    handleChangeUsername = (e) => {
        this.setState({
           username: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault() 
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',           
            }, 
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (user.message === "Invalid username or password") {
                alert("Invalid username or password")
            } else{
                sessionStorage.setItem('token', user.jwt)
                this.props.setUser(user)
                this.getUserEntries()
                this.props.handleLogin()
            }
        })
        // .then(user => user.error ? 'yes error': 'no error')
    }

    getUserEntries = () => {
        let token = sessionStorage.getItem('token')
        fetch('http://127.0.0.1:3000/entries', {
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(userEntries => this.props.populateEntries(userEntries))
    }


    render() {
        return (
            <div className="form-container"> 
            <form onSubmit={(e) => this.handleLogin(e)}>
                <h3>Please Sign In</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(e) => this.handleChangeUsername(e)} type="username" className="form-control" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Log In</button><br></br>
                
            </form>

            <button  onClick={this.props.showRegisterForm} className="btn btn-primary btn-block">Create an Account?</button>
            </div>
        );
    }
}


export default connect(null, {setUser, populateEntries})(Login);