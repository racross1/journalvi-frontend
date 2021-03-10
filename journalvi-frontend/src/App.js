import './App.css';
import React from 'react';
import LoginAndRegister from './containers/LoginAndRegister.js'
import MainPage from './containers/MainPage.js'
import { connect } from 'react-redux';
import { setUser } from './actions/users.js';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
state = {
  loggedIn: false
}


  componentDidMount() {
    let token = sessionStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        }, 
      })
      .then(resp => resp.json())
      // .then(console.log)
      .then(user => this.props.setUser(user))
    }
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    })
  }

  logout = () => {
    sessionStorage.clear() 
    this.setState({
      loggedIn: false 
    })
  }
  
  
    render() {
      
      return (
      <div className="App">
       
       {sessionStorage.getItem('token') !== null ? <MainPage logout={this.logout}/> : <LoginAndRegister handleLogin={this.handleLogin}/> }    

      </div>
      )}
    }



    export default connect(null, {setUser})(App);
