import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

// --orange-color: rgb(226, 125, 96);
// --light-blue-color: rgb(133,220,186);
// --yellow-color: rgb(232, 168, 124);
// --purple-color: rgb(195, 141, 158);
// --teal-color: rgb( 65,179,163);

//colors
// let posColor = '40,167,69'
// let negColor = '220,53,69'
// let neutColor = '255,193,7'
// let mixedColor = '0,123,255'

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

export default class EntryList extends React.Component{
  state = {
      selectedEntries:[]
  }

    componentDidMount(){
        this.showAllEntries()
    }
    
    showAllEntries = () => {
        let allEntriesSorted = this.sortEntries(this.props.entries)
        this.setState({
            selectedEntries: allEntriesSorted
        })

    }

    sortEntries = (entries) => {
        return entries.sort((a,b) => a.date > b.date ? 1 : -1)
    }

    dayColor = (entry) => {
        let entryScore = entry.agg_score_key
        let scoreVal = entry.agg_score - 0.1
       
        switch(entryScore) {
            case 'POSITIVE':
                return `rgba(${posColor}, ${scoreVal})` 
            case 'NEGATIVE':
                return `rgba(${negColor}, ${scoreVal})` 
            case 'NEUTRAL':
                return `rgba(${neutColor}, ${scoreVal})` 
            case 'MIXED':
                return `rgba(${mixedColor}, ${scoreVal})`    
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
       
        return <tr key={`${entry.id}`}>
           
            <td><Link to={`/entries/${entry.id}`}><Button  variant={'secondary'}>Detail</Button></Link></td>
            <td>{weekDay}</td>
            <td>{month}</td>
            <td>{day}</td>
            <td>{year}</td>
            <td>
                {entry.agg_score_key}
                <Card 
                    className="table-day-card"
                    style={{backgroundColor: this.dayColor(entry)}}
                >
                </Card>
            </td>
            <td>
                {this.showAggScore(entry)}
            </td>
        </tr>
  
    }

    parseDate = (date) => {
        let d = new Date(date)
        let dPlusOne = new Date(d.setDate(d.getDate() + 1))
        let dArr = String(dPlusOne).split(" ")
        return dArr
    }

    handleMonthFilter = (e) => {
        let filtEntries = this.props.entries.filter(entry => this.parseDate(entry.date)[1] === e.target.name)

        this.setState({
            selectedEntries: filtEntries
        })
    }

    handleDoWFilter = (e) => {
        let filtEntries = this.props.entries.filter(entry => this.parseDate(entry.date)[0] === e.target.name)

        this.setState({
            selectedEntries: filtEntries
        })
    }

    handleSentimentFilter = (e) => {
        let filtEntries = this.props.entries.filter(entry => entry.agg_score_key === e.target.name)

        this.setState({
            selectedEntries: filtEntries
        })
    }
    
    render(){
        return (
        <div  className='entry-list'>
            <div className='entry-list-header'>
            Filter By:
            <br></br>
        <DropdownButton
        className='button-1'
           as={ButtonGroup}
           key={1}
           id={`dropdown-variants-month`}
           title={'Month'}
           >
            <Dropdown.Item onClick={this.handleMonthFilter} name='Jan'>January</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Feb'>February</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Mar'>March</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Apr'>April</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='May'>May</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Jun'>June</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Jul'>July</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Aug'>August</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Sep'>September</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Oct'>October</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Nov'>November</Dropdown.Item>
            <Dropdown.Item onClick={this.handleMonthFilter} name='Dec'>December</Dropdown.Item>
        <Dropdown.Divider />
            <Dropdown.Item onClick={this.showAllEntries} name='all'>See All</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
        className='button-1'
           as={ButtonGroup}
           key={2}
           id={`dropdown-variants-DoW`}
           title={'Day of Week'}
           >
            <Dropdown.Item onClick={this.handleDoWFilter} name='Mon'>Monday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Tue'>Tuesday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Wed'>Wednesday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Thu'>Thursday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Fri'>Friday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Sat'>Saturday</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDoWFilter} name='Sun'>Sunday</Dropdown.Item>
        <Dropdown.Divider />
            <Dropdown.Item onClick={this.showAllEntries} name='all'>See All</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
        className='button-1'
           as={ButtonGroup}
           key={3}
           id={`dropdown-variants-sentiment`}
           title={'Sentiment'}
           >
            <Dropdown.Item onClick={this.handleSentimentFilter} name='POSITIVE'>Positive</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSentimentFilter} name='NEGATIVE'>Negative</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSentimentFilter} name='NEUTRAL'>Neutral</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSentimentFilter} name='MIXED'>Mixed</Dropdown.Item>
        <Dropdown.Divider />
            <Dropdown.Item onClick={this.showAllEntries} name='all'>See All</Dropdown.Item>
        </DropdownButton>
        </div>
           
            <Table className='entrylist-table'>
                <thead>
                <tr>
                    <th>Entry Detail</th>
                    <th>Day of Week</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Year</th>
                    <th>Sentiment</th>
                    <th>Confidence Score</th>
                </tr>
                </thead>
                {this.state.selectedEntries.map(ent => this.renderEntries(ent))}
            </Table>
        </div>
            )
        }
    }