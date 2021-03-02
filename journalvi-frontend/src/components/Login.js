import React from "react";
import { connect } from 'react-redux';
import { setUser } from '../actions/users.js';
// import { populateEntries } from '../actions/entries.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
                // this.getUserEntries()
                this.props.handleLogin()
            
            }
        })
       
    }


    render() {
        return (
            <div className="form-container"> 
             <Form id='login-form' onSubmit={this.handleLogin}>
             <h5>Please Sign In</h5>
                
                <Form.Group controlId="login-form-username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control size='sm' onChange={(e) => this.handleChangeUsername(e)} type="username" className="form-control" placeholder="Enter Username"/>
                </Form.Group>
                
                <Form.Group controlId="login-form-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size='sm' onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                </Form.Group>
                
                <Button type="submit">Log In</Button><br></br>

            </Form>
            
            
            {/* <form onSubmit={(e) => this.handleLogin(e)}>
                <h5>Please Sign In</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(e) => this.handleChangeUsername(e)} type="username" className="form-control" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <Button type="submit">Log In</Button><br></br>
                
            </form> */}

            <Button  onClick={this.props.showRegisterForm}>Create an Account</Button>
            </div>
        );
    }
}


export default connect(null, {setUser})(Login);