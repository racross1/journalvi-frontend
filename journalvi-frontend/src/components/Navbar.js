import React from 'react' 
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Navbar extends React.Component {


    render () {
        return (
            <div className="sidebar">
                Hello this is side nav
                <Link to='/entries/new' className='ui-button'>
                Create New Entry
                </Link>
                <Link to='/entries' className='ui-button'>
                All Entries
                </Link>
            </div>
        )
    }
}