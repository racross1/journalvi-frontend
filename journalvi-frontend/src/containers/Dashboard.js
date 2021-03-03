import React from "react";
import Calendar from '../components/Calendar.js'

class Dashboard extends React.Component {

render(){
    return(
        <div id='dashboard'>
            <Calendar />
        </div>
    )
}
}

export default Dashboard