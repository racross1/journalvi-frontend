import React from 'react' 
import Navbar from '../components/Navbar.js'
import DynamicPane from './DynamicPane.js'
import { connect } from 'react-redux';
import { fetchEntries } from '../actions/entries.js'




class MainPage extends React.Component {
    componentDidMount(){
        this.getUserEntries()
    }

    getUserEntries = () => {
        this.props.fetchEntries()
        // let token = sessionStorage.getItem('token')
        // fetch('http://127.0.0.1:3000/entries', {
        //     method: "GET",
        //     headers: {
        //       Authorization: `bearer ${token}`,
        //     }
        // })
        // .then(resp => resp.json())
        // .then(userEntries => this.props.populateEntries(userEntries))
    }
    render(){
        // console.log(this.props.entryReducer.entries)
        return (
        <div className="main-page">
        <Navbar logout={this.props.logout}/>
        {this.props.requesting ? "Loading page..." : <DynamicPane entries={this.props.entries}/>}
        </div>
    );
    }
}


function mapDispatchToProps(dispatch){
    return { fetchEntries: () => dispatch(fetchEntries()) }
  }

function mapStateToProps (state) {
    
    return {
        entries: state.entryReducer.entries,
        requesting: state.entryReducer.requesting
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);