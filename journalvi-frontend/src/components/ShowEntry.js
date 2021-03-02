import React from 'react'
// import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Container from 'react-bootstrap/Container'

class ShowEntry extends React.Component{
    state = {
        entry: false
    }

    componentDidMount(){
        let entry = this.props.entry
        this.setState({
            entry: entry
        })
        

    }

    componentWillUnmount = () => {
        this.setState({
            entry: false
        })
    }
    
    parseDate = (date) => {
        //for some reason dates are coming back as 1 day late
        //add one day to each to get correct date
        let d = new Date(date)
        let dPlusOne = new Date(d.setDate(d.getDate() + 1))
        let dArr = String(dPlusOne).split(" ")
        let parsedDate = dArr.slice(0,3).join(" ")+', '+ dArr[3]
        return parsedDate
    }

    dayColor = () => {
        // console.log(this.state.entry.prompts[0].prompt)
        let entryScore = this.state.entry.agg_score_key
        let scoreVal = this.state.entry.agg_score - 0.1
       
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

    promptColor = (score) => {
        // console.log(score)
        switch(score.sentiment) {
            case 'POSITIVE':
                return `rgba(40,167,69, ${score.pos_score - 0.1})` 
            case 'NEGATIVE':
                return `rgba(220,53,69, ${score.neg_score - 0.1})`
            case 'NEUTRAL':
                return `rgba(255,193,7, ${score.neut_score - 0.1})`
            case 'MIXED':
                return `rgba(0,123,255, ${score.mixed_score - 0.1})`
        
        }
    }

    showScore = (score) => {
        switch(score.sentiment) {
            case 'POSITIVE':
                return `${(score.pos_score * 100).toFixed(1)}%` 
            case 'NEGATIVE':
                return `${(score.neg_score * 100).toFixed(1)}%`
            case 'NEUTRAL':
                return `${(score.neut_score * 100).toFixed(1)}%`
            case 'MIXED':
                return `${(score.mixed_score * 100).toFixed(1)}%`
        
        }
    }

    showAggScore = () => {
       return `${(this.state.entry.agg_score * 100).toFixed(1)}%` 
    }



    createCards = (p, idx) => {
        // console.log(idx)
        let score = this.state.entry.scores[idx]
        //add score show method
        // console.log(score)
        return (<div key={`${idx}`}>
            <Card className='summary-card'>
                <Card.Header className='prompt-cell'><span className='head-label'>Prompt:</span> {p.prompt}</Card.Header>
                <Card.Body >
                    <Card.Text className='response-cell'>
                        <span className='head-label'>Your Response: </span>
                        {p.response}
                    </Card.Text>
                </Card.Body>
               
                <Card.Body style={{backgroundColor: this.promptColor(score)}}>
                    <Container>
                   
                    <Card.Text className='summary-cell'>
                    <Row>
                        <Col  sm={8}><span className='head-label-summary'>Sentiment:</span> <span className='summary-text'>{score.sentiment}</span></Col>
                        <Col className='right-col-sum-cell'><span className='head-label-summary'>Confidence Score: </span><span className='summary-text'>{this.showScore(score)}</span></Col>
                    </Row>
                    </Card.Text>
                  
                    </Container>
                </Card.Body>
            </Card>
                <br></br>
        </div>
        )
    }


    render(){
        console.log(this.props.entry)
        
        return (
            <div className='right-pane-show-page'> 
                {!this.state.entry ? null: <div>
                    <Row className='header-row'>
                        <Col className="head-label" sm={2}>Entry Date:</Col> 
                        <Col sm={3} className='date-col'> {this.parseDate(this.state.entry.date)}</Col>
                        <Col className='header-summary-col'><span className='head-label'>Aggregate Entry Sentiment: </span><br></br>{this.state.entry.agg_score_key} <br></br>{this.showAggScore()}</Col>
                        <Col sm={2}>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This color represents the aggregate sentiment score for this journal entry</Tooltip>}>
                        
                        <Card 
                        className="day-card"
                        style={{backgroundColor: this.dayColor()}}
                        ></Card>
                        </OverlayTrigger>
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>

                    {this.state.entry.prompts.map((p, idx) => this.createCards(p, idx))}
                    
                    
                    </div>}
          
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         entries: state.entryReducer.entries,
//         requesting: state.entryReducer.requesting
//     }
// }


// export default connect(mapStateToProps)(ShowEntry)
export default ShowEntry