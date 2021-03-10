import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'
            


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
        //add one day to each to get correct date
        let d = new Date(date)
        let dPlusOne = new Date(d.setDate(d.getDate() + 1))
        let dArr = String(dPlusOne).split(" ")
        let parsedDate = dArr.slice(0,3).join(" ")+', '+ dArr[3]
        return parsedDate
    }

    dayColor = () => {
        let entryScore = this.state.entry.agg_score_key
        let scoreVal = this.state.entry.agg_score - 0.1
       
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

    promptColor = (score) => {
        switch(score.sentiment) {
            case 'POSITIVE':
                return `rgba(${posColor}, ${score.pos_score - 0.1})` 
            case 'NEGATIVE':
                return `rgba(${negColor}, ${score.neg_score - 0.1})`
            case 'NEUTRAL':
                return `rgba(${neutColor}, ${score.neut_score - 0.1})`
            case 'MIXED':
                return `rgba(${mixedColor}, ${score.mixed_score - 0.1})`
        
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
        let score = this.state.entry.scores[idx]
        
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
                       <OverlayTrigger  placement="bottom" overlay={
                            <Popover id="info-popover">
                                <Popover.Title as="h3">What's this?</Popover.Title>
                                <Popover.Content> 
                                    Each of your responses to the prompts below received a percentage score representing the AI's confidence level that the sentiment was Positive, Negative, Neutral and Mixed. 
                                    <br></br>
                                    <br></br>
                                    We calculated the average score of each sentiment across each prompt in your entry. This color and number represent the <strong>highest average</strong> sentiment score (e.g. if across each of your responses, Positive has the highest average score, we give you the average positive sentiment score).
                                    <br></br>
                                    <br></br>
                                    This is meant to give you a sense of the predominant overall sentiment for your entry.
                                </Popover.Content>
                        </Popover>}> 
                        
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


export default ShowEntry