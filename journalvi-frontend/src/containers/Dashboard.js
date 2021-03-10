import React from "react";
import Calendar from '../components/Calendar.js'
import WeekCal from '../components/WeekCal.js'
import { connect } from 'react-redux';
import MonthGraph from "../components/MonthGraph.js"
import MonthGraphMorn from "../components/MonthGraphMorn.js"
import MonthGraphAft from "../components/MonthGraphAft.js"
import MonthGraphEv from "../components/MonthGraphEv.js"
import SentimentPieChart from "../components/SentimentPie.js"
import SentimentPieChartMorn from "../components/SentimentPieMorn.js"
import SentimentPieChartAft from "../components/SentimentPieAft.js"
import SentimentPieChartEv from "../components/SentimentPieEv.js"
import SentimentPieChartWeek from "../components/SentimentPieWeek.js"
import DashPaneMonth from "../components/DashPaneMonth.js"
import DashPaneWeek from "../components/DashPaneWeek.js"


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


import {format, startOfWeek, addDays, isSameMonth, isSameWeek} from "date-fns";


class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        let initMonth = new Date()
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), initMonth))
        let xAxis = Object.keys(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let monthDisplay = format(initMonth,'MMMM')

        let yPosAxis = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let yNegAxis = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'entryAvg'))
        let yNeutAxis =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'entryAvg'))
        let yMixedAxis = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'entryAvg'))

        let yPosAxisM = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'morning'))
        let yNegAxisM = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'morning'))
        let yNeutAxisM =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'morning'))
        let yMixedAxisM = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'morning'))

        let yPosAxisA = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'afternoon'))
        let yNegAxisA = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'afternoon'))
        let yNeutAxisA =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'afternoon'))
        let yMixedAxisA = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'afternoon'))

        let yPosAxisE = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'evening'))
        let yNegAxisE = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'evening'))
        let yNeutAxisE =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'evening'))
        let yMixedAxisE = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'evening'))
        
        let dateFormatWeeks = "MMM d yyyy"
        let initWeek = new Date()
        let weekSelectedEntries = this.selectWeekEntries(initWeek)
        let weekDisplay = format(startOfWeek(initWeek), dateFormatWeeks)

    this.state = {
        display: 'month',
        currentMonth: new Date(),
        selectedEntries: selectedEntries,
        revision: 0,
        x: xAxis,
        currentMonthDisplay: monthDisplay,

        yPos: yPosAxis,
        yNeg: yNegAxis,
        yNeut: yNeutAxis,
        yMixed: yMixedAxis,

        yPosM: yPosAxisM,
        yNegM: yNegAxisM,
        yNeutM: yNeutAxisM,
        yMixedM: yMixedAxisM,

        yPosA: yPosAxisA,
        yNegA: yNegAxisA,
        yNeutA: yNeutAxisA,
        yMixedA: yMixedAxisA,

        yPosE: yPosAxisE,
        yNegE: yNegAxisE,
        yNeutE: yNeutAxisE,
        yMixedE: yMixedAxisE,
        
        currentWeek: initWeek,
        weekSelectedEntries: weekSelectedEntries,
        currentWeekDisplay: weekDisplay

    }}

    setWeek = (week) => {
        let weekSelectedEntries = this.selectWeekEntries(week)
        let dateFormatWeeks = "MMM d yyyy"
        let weekDisplay = format(startOfWeek(week), dateFormatWeeks)

        this.setState({
            currentWeek: week,
            weekSelectedEntries: weekSelectedEntries,
            currentWeekDisplay: weekDisplay
        })
    }

    selectWeekEntries = (week) => {
        
        return this.props.entries.filter(entry => isSameWeek(this.parseEntryDate(entry.date), week))


    }

    setMonth = (month) => {
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), month))
        let revisionPlusOne = this.state.revision + 1
        let xAxis = Object.keys(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let monthDisplay = format(month,'MMMM')

        let yPosAxis = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let yNegAxis = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'entryAvg'))
        let yNeutAxis =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'entryAvg'))
        let yMixedAxis = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'entryAvg'))

        let yPosAxisM = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'morning'))
        let yNegAxisM = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'morning'))
        let yNeutAxisM =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'morning'))
        let yMixedAxisM = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'morning'))

        let yPosAxisA = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'afternoon'))
        let yNegAxisA = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'afternoon'))
        let yNeutAxisA =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'afternoon'))
        let yMixedAxisA = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'afternoon'))
       
        let yPosAxisE = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'evening'))
        let yNegAxisE = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'evening'))
        let yNeutAxisE =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'evening'))
        let yMixedAxisE = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'evening'))
        
        this.setState({
            currentMonth: month,
            selectedEntries: selectedEntries,
            revision: revisionPlusOne,
            x: xAxis,
            currentMonthDisplay: monthDisplay,

            yPos: yPosAxis,
            yNeg: yNegAxis,
            yNeut: yNeutAxis,
            yMixed: yMixedAxis,

            yPosM: yPosAxisM,
            yNegM: yNegAxisM,
            yNeutM: yNeutAxisM,
            yMixedM: yMixedAxisM,

            yPosA: yPosAxisA,
            yNegA: yNegAxisA,
            yNeutA: yNeutAxisA,
            yMixedA: yMixedAxisA,

            yPosE: yPosAxisE,
            yNegE: yNegAxisE,
            yNeutE: yNeutAxisE,
            yMixedE: yMixedAxisE,

        })
    }

    createXYAxisObj= (entries, sentiment, output) => {
        let dateFormat = "d"
        let axisObj = {}
        
        switch(output) {
        
            case 'entryAvg':
                entries.forEach(entry => {
                    let dateNum = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
                    axisObj[dateNum] = this.getScoreAverages(entry, sentiment)
                })

                return axisObj

            case 'morning':
                entries.forEach(entry => {
                    let dateNumM = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
                    axisObj[dateNumM] = this.getMorningScore(entry, sentiment)
                })

                return axisObj

            case 'afternoon':
                entries.forEach(entry => {
                    let dateNumA = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
                    axisObj[dateNumA] = this.getAfternoonScore(entry, sentiment)
                })

                return axisObj

            case 'evening':
                entries.forEach(entry => {
                    let dateNumE = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
                    axisObj[dateNumE] = this.getEveningScore(entry, sentiment)
                })

                return axisObj


    }
   
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

getMorningScore = (entry, sentiment) => {
    switch(sentiment) {
        case 'POSITIVE':
            return entry.scores[0].pos_score
           
        case 'NEGATIVE':
            return entry.scores[0].neg_score

        case 'NEUTRAL':
            return entry.scores[0].neut_score

        case 'MIXED':
            return entry.scores[0].mixed_score

    }
}

getAfternoonScore = (entry, sentiment) => {
    switch(sentiment) {
        case 'POSITIVE':
            return entry.scores[1].pos_score
           
        case 'NEGATIVE':
            return entry.scores[1].neg_score

        case 'NEUTRAL':
            return entry.scores[1].neut_score

        case 'MIXED':
            return entry.scores[1].mixed_score

    }
}


getEveningScore = (entry, sentiment) => {
    switch(sentiment) {
        case 'POSITIVE':
            return entry.scores[2].pos_score
           
        case 'NEGATIVE':
            return entry.scores[2].neg_score

        case 'NEUTRAL':
            return entry.scores[2].neut_score

        case 'MIXED':
            return entry.scores[2].mixed_score

    }
}

parseEntryDate = (date) => {
    let d = new Date(date)
    
    return addDays(d, 1)

}

handleDisplayToggle = (e) => {
    let initMonth = new Date()
        let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), initMonth))
        let xAxis = Object.keys(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let monthDisplay = format(initMonth,'MMMM')

        let yPosAxis = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'entryAvg'))
        let yNegAxis = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'entryAvg'))
        let yNeutAxis =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'entryAvg'))
        let yMixedAxis = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'entryAvg'))

        let yPosAxisM = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'morning'))
        let yNegAxisM = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'morning'))
        let yNeutAxisM =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'morning'))
        let yMixedAxisM = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'morning'))

        let yPosAxisA = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'afternoon'))
        let yNegAxisA = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'afternoon'))
        let yNeutAxisA =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'afternoon'))
        let yMixedAxisA = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'afternoon'))

        let yPosAxisE = Object.values(this.createXYAxisObj(selectedEntries, "POSITIVE", 'evening'))
        let yNegAxisE = Object.values(this.createXYAxisObj(selectedEntries, "NEGATIVE", 'evening'))
        let yNeutAxisE =  Object.values(this.createXYAxisObj(selectedEntries, "NEUTRAL", 'evening'))
        let yMixedAxisE = Object.values(this.createXYAxisObj(selectedEntries, "MIXED", 'evening'))
        
        let dateFormatWeeks = "MMM d yyyy"
        let initWeek = new Date()
        let weekSelectedEntries = this.selectWeekEntries(initWeek)
        let weekDisplay = format(startOfWeek(initWeek), dateFormatWeeks)
    this.setState({
        display: e.target.name,
        currentMonth: new Date(),
        selectedEntries: selectedEntries,
        revision: 0,
        x: xAxis,
        currentMonthDisplay: monthDisplay,

        yPos: yPosAxis,
        yNeg: yNegAxis,
        yNeut: yNeutAxis,
        yMixed: yMixedAxis,

        yPosM: yPosAxisM,
        yNegM: yNegAxisM,
        yNeutM: yNeutAxisM,
        yMixedM: yMixedAxisM,

        yPosA: yPosAxisA,
        yNegA: yNegAxisA,
        yNeutA: yNeutAxisA,
        yMixedA: yMixedAxisA,

        yPosE: yPosAxisE,
        yNegE: yNegAxisE,
        yNeutE: yNeutAxisE,
        yMixedE: yMixedAxisE,
        
        currentWeek: initWeek,
        weekSelectedEntries: weekSelectedEntries,
        currentWeekDisplay: weekDisplay
    })

}

    
render(){
    
    return(
        <div id='dashboard'>
            <br></br>
            <Button name='month' onClick={this.handleDisplayToggle}>Month View</Button>
            <Button name='week' onClick={this.handleDisplayToggle}>Week View</Button>
            
           {this.state.display === 'month' ? <div className='month-display'>
           
           
           <div className='month-box'><Calendar entries={this.props.entries} setMonth={this.setMonth}/></div>

           <h2 className='dashboard-header'>Your Month at a Glance</h2>
           <Row>
                <Col>
                    <div className='dash-summary-pane'>{<DashPaneMonth 
                        selectedEntries={this.state.selectedEntries}/>}
                    </div>
               </Col>
               <Col>
                    <SentimentPieChart 
                    selectedEntries={this.state.selectedEntries}
                    currentMonthDisplay={this.state.currentMonthDisplay}/>
                </Col>
            </Row>

            <h2 className='dashboard-header'>Aggregate Sentiment Trend</h2>
            
            <MonthGraph 
                entries={this.props.entries} 
                selectedEntries={this.state.selectedEntries} 
                currentMonth={this.state.currentMonth}
                revision={this.state.revision}
                x={this.state.x}
                currentMonthDisplay={this.state.currentMonthDisplay}
                yPos={this.state.yPos}
                yNeg={this.state.yNeg}
                yNeut={this.state.yNeut}
                yMixed={this.state.yMixed}
               
            /><br></br>   <br></br>
        <h2 className='dashboard-header'>Sentiment Stats by Time of Day</h2>
            <SentimentPieChartMorn 
            selectedEntries={this.state.selectedEntries}
            currentMonthDisplay={this.state.currentMonthDisplay}/>
            
            <MonthGraphMorn 
                entries={this.props.entries} 
                selectedEntries={this.state.selectedEntries} 
                currentMonth={this.state.currentMonth}
                revision={this.state.revision}
                x={this.state.x}
                currentMonthDisplay={this.state.currentMonthDisplay}
                yPos={this.state.yPosM}
                yNeg={this.state.yNegM}
                yNeut={this.state.yNeutM}
                yMixed={this.state.yMixedM}
                
            />
            <br></br>   <br></br>
            <SentimentPieChartAft 
                selectedEntries={this.state.selectedEntries}
                currentMonthDisplay={this.state.currentMonthDisplay}/>

            <MonthGraphAft
                entries={this.props.entries} 
                selectedEntries={this.state.selectedEntries} 
                currentMonth={this.state.currentMonth}
                revision={this.state.revision}
                x={this.state.x}
                currentMonthDisplay={this.state.currentMonthDisplay}
                yPos={this.state.yPosA}
                yNeg={this.state.yNegA}
                yNeut={this.state.yNeutA}
                yMixed={this.state.yMixedA}
                
            />
            <br></br>   <br></br>
            <SentimentPieChartEv
                selectedEntries={this.state.selectedEntries}
                currentMonthDisplay={this.state.currentMonthDisplay}/>
            
            <MonthGraphEv
                entries={this.props.entries} 
                selectedEntries={this.state.selectedEntries} 
                currentMonth={this.state.currentMonth}
                revision={this.state.revision}
                x={this.state.x}
                currentMonthDisplay={this.state.currentMonthDisplay}
                yPos={this.state.yPosE}
                yNeg={this.state.yNegE}
                yNeut={this.state.yNeutE}
                yMixed={this.state.yMixedE}
                
            />
            </div> : <div className='week-display'>
            
            <WeekCal  entries={this.props.entries} setWeek={this.setWeek}/>
            <h2 className='dashboard-header'>Your Week at a Glance</h2>
            <Row>
                <Col>
                <div className='dash-summary-pane'>{<DashPaneWeek 
                        selectedEntries={this.state.weekSelectedEntries}/>}
                    </div>
                </Col>
                <Col>
                    <SentimentPieChartWeek selectedEntries={this.state.weekSelectedEntries} weekDisplay={this.state.currentWeekDisplay}/>
                </Col>
            </Row>
            </div>}
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