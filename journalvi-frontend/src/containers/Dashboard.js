import React from "react";
import Calendar from '../components/Calendar.js'
import { connect } from 'react-redux';
import PieChart from "../components/PieChart.js"
import MonthTrend from "../components/MonthTrend.js"
import MonthGraph from "../components/MonthGraph.js"
import {format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from "date-fns";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), new Date()))
    this.state = {
        currentMonth: new Date(),
        selectedEntries: selectedEntries
    }}

    setMonth = (month) => {
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), month))
        this.setState({
            currentMonth: month,
            selectedEntries: selectedEntries
        })
    }

    selectEntries = (entries) => {
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), this.state.currentMonth))
        return selectedEntries

    }

    parseEntryDate = (date) => {
        let d = new Date(date)
        
        return addDays(d, 1)
    
    
    }
    

render(){
    
    return(
        <div id='dashboard'>
            <Calendar entries={this.props.entries} setMonth={this.setMonth}/>
            {/* <PieChart entries={this.props.entries}/> */}
            <MonthGraph entries={this.props.entries} selectedEntries={this.state.selectedEntries} currentMonth={this.state.currentMonth}/>
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