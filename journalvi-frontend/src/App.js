import './App.css';
import React from 'react';
import LoginAndRegister from './containers/LoginAndRegister.js'
import LoggedIn from './components/LoggedIn.js'
import { connect } from 'react-redux';
import { setUser } from './actions/users.js';

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
  //make this in redux
  // handleUserSession = (user) => {
    
  //   // sessionStorage.setItem('token', user.jwt)
  //   this.setState({
  //     userData: user.user,
  //   })
  // }
  
    render() {
      
      return (
      <div className="App">
       {/* {sessionStorage.getItem('token') !== null ? <LoggedIn userData={this.state.userData} /> : <LoginAndRegister handleUserSession={this.handleUserSession} /> }     */}
       {sessionStorage.getItem('token') !== null ? <LoggedIn /> : <LoginAndRegister handleLogin={this.handleLogin}/> }    

      </div>
      )}
    }



    export default connect(null, {setUser})(App);
