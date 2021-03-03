import React from "react";
import Calendar from '../components/Calendar.js'
import { connect } from 'react-redux';

class Dashboard extends React.Component {

render(){
    return(
        <div id='dashboard'>
            <Calendar entries={this.props.entries}/>
        </div>
    )
}
}

function mapStateToProps (state) {
    return{
        entries: state.entryReducer.entries
    }
}

export default connect(mapStateToProps)(Dashboard)