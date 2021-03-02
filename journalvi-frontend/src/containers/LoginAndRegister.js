import React from 'react' 
import Login from '../components/Login.js'
import SignUpForm from '../components/SignUpForm.js'


export default class LoginAndRegister extends React.Component {

    state = {
        toggle: false
    }

    showRegisterForm = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle
            }
        })
    }
    
    render() {
        return(
            <div className='login-box'>
                <div>
                    <h3>Welcome to JournalVi!</h3>
                </div>
            {/* {this.state.toggle === false ? <Login showRegisterForm={this.showRegisterForm} handleUserSession={this.props.handleUserSession} /> : <SignUpForm showRegisterForm={this.showRegisterForm} handleUserSession={this.props.handleUserSession}/> } */}
            {this.state.toggle === false ? <Login showRegisterForm={this.showRegisterForm} handleLogin={this.props.handleLogin}/> : <SignUpForm showRegisterForm={this.showRegisterForm} handleLogin={this.props.handleLogin}/> }

            </div> 
        )
    }
}
