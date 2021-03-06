import React from 'react' 
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Navbar extends React.Component {


    render () {
        return (
            <div className="sidebar">
               
                <Link to='/entries/new' className='ui-button'>
                Create New Entry
                </Link>
                <Link to='/entries' className='ui-button'>
                All Entries
                </Link>
                <Link to='/dashboard' className='ui-button'>
                Dashboard
                </Link>
                <Link to='/about' className='ui-button'>
                About
                </Link>
                <Link onClick={() => this.props.logout()} to='/' className='ui-button'>
                Logout
                </Link>
            </div>
        )
    }
}