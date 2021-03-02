import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'



export default class EntryList extends React.Component{
  
    sortEntries = () => {
        return this.props.entries.sort((a,b) => a.date > b.date ? 1 : -1)
    }

    dayColor = (entry) => {
        let entryScore = entry.agg_score_key
        let scoreVal = entry.agg_score - 0.1
       
        switch(entryScore) {
            case 'POSITIVE':
                return `rgba(40,167,69, ${scoreVal})` 
            case 'NEGATIVE':
                return `rgba(220,53,69, ${scoreVal})`
            case 'NEUTRAL':
                return `rgba(255,193,7, ${scoreVal})`
            case 'MIXED':
                return `rgba(0,123,255, ${scoreVal})`
          
                
        }
    }

    showAggScore = (entry) => {
        return `${(entry.agg_score * 100).toFixed(1)}%` 
     }

    renderEntries = (entry) => {
        let entryDateArr = this.parseDate(entry.date)
        let weekDay = entryDateArr[0]
        let month = entryDateArr[1]
        let day = entryDateArr[2]
        let year = entryDateArr[3]
       
        return <tr>
            <td><Link to={`/entries/${entry.id}`}>{weekDay}</Link></td>
            <td>{month}</td>
            <td>{day}</td>
            <td>{year}</td>
            <td>{entry.agg_score_key}</td>
            <td>
                {this.showAggScore(entry)}
                <Card 
                    className="table-day-card"
                    style={{backgroundColor: this.dayColor(entry)}}
                >
                </Card>
            </td>
        </tr>
  
    }

    parseDate = (date) => {
        let d = new Date(date)
        let dArr = String(d).split(" ")
        return dArr
        // let parsedDate = dArr.slice(0,3).join(" ")+', '+ dArr[3]
        // return parsedDate
    }

    
    render(){
        console.log(this.sortEntries())
        return (
        <div  className='entry-list'>
            list of all entries
            <Table hover>
                <thead>
                <tr>
                    <th>Day of Week</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Year</th>
                    <th>Entry Sentiment</th>
                    <th>Entry Confidence Score</th>
                </tr>
                </thead>
                {this.sortEntries().map(ent => this.renderEntries(ent))}
            </Table>
        </div>
            )
        }
    }