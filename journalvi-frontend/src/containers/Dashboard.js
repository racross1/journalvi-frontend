import React from "react";
import Calendar from '../components/Calendar.js'
import { connect } from 'react-redux';
import PieChart from "../components/PieChart.js"
import MonthGraph from "../components/MonthGraph.js"
import {format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from "date-fns";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        let initMonth = new Date()
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), initMonth))
        let xAxis = Object.keys(this.createXYAxisObj(selectedEntries, "POSITIVE"))
        let yPosAxis = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE"))
        let yNegAxis = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE"))
        let yNeutAxis =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL"))
        let yMixedAxis = Object.values(this.createXYAxisObj(selectedEntries, "MIXED"))
        let monthDisplay = format(initMonth,'MMMM')

    this.state = {
        currentMonth: new Date(),
        selectedEntries: selectedEntries,
        revision: 0,
        x: xAxis,
        yPos: yPosAxis,
        yNeg: yNegAxis,
        yNeut: yNeutAxis,
        yMixed: yMixedAxis,
        currentMonthDisplay: monthDisplay
    }}

    setMonth = (month) => {
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), month))
        let revisionPlusOne = this.state.revision + 1
        let xAxis = Object.keys(this.createXYAxisObj(selectedEntries, "POSITIVE"))
        let yPosAxis = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE"))
        let yNegAxis = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE"))
        let yNeutAxis =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL"))
        let yMixedAxis = Object.values(this.createXYAxisObj(selectedEntries, "MIXED"))
        let monthDisplay = format(month,'MMMM')
        
        this.setState({
            currentMonth: month,
            selectedEntries: selectedEntries,
            revision: revisionPlusOne,
            x: xAxis,
            yPos: yPosAxis,
            yNeg: yNegAxis,
            yNeut: yNeutAxis,
            yMixed: yMixedAxis,
            currentMonthDisplay: monthDisplay 
        })
    }

    createXYAxisObj= (entries, sentiment) => {
        let dateFormat = "d"
        let axisObj = {}
        entries.forEach(entry => {
           let dateNum = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
           axisObj[dateNum] = this.getScoreAverages(entry, sentiment)
       })

      return axisObj
   
   }

   getScoreAverages = (entry, sentiment) => {
    let total = 0;
    switch(sentiment) {
        case 'POSITIVE':
            entry.scores.forEach(score => {
                total += score.pos_score
            })
            return total / entry.scores.length;
           
        case 'NEGATIVE':
            entry.scores.forEach(score => {
                total += score.neg_score
            })
            return total / entry.scores.length;

        case 'NEUTRAL':
            entry.scores.forEach(score => {
                total += score.neut_score
            })
            return total / entry.scores.length;
        case 'MIXED':
            entry.scores.forEach(score => {
                total += score.mixed_score
            })
            return total / entry.scores.length;

    }
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
            <MonthGraph 
            entries={this.props.entries} 
            selectedEntries={this.state.selectedEntries} 
            currentMonth={this.state.currentMonth}
            revision={this.state.revision}
            x={this.state.x}
            yPos={this.state.yPos}
            yNeg={this.state.yNeg}
            yNeut={this.state.yNeut}
            yMixed={this.state.yMixed}
            currentMonthDisplay={this.state.currentMonthDisplay}/>
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