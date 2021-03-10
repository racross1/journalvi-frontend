import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

class About extends React.Component{
  
    render(){
        return (
        <div  className='about'>
            <h1 className='about-heading'><strong>Welcome!</strong></h1> 
            <div className='about-body'>
            <br></br>
             JournalVi (short for Journal + View) is a daily journaling app that uses <strong>AWS Comprehend</strong> (Amazon's machine learning API for Natural Language Processing and sentiment detection) to help you track and visualize your mood day to day.
            <br></br>
            
            <br></br>
            <br></br>
            <h2 className='about-section-heading'>How Does it Work?</h2>
            <br></br>
            To create a new entry, go to "Create New Entry" on the sidebar. Fill in responses to each of the three prompts (one prompt for the morning, one for the afternoon and one for the evening) and then hit submit. That's it!
            <br></br>
            <br></br>
            Once you submit your entry, AWS Comprehend will analyze the text and return its response.
            <br></br>
            <br></br>
            Each of your three prompt responses (morning, afternoon and evening) will be analyzed separately and will receive it's own <strong>sentiment score</strong>.
            <br></br>
            <br></br> 
            The sentiment score has 2 main parts:
            <br></br><br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;- Comprehend's assessment of the predominate sentiment of the text.<br></br> 
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;- Comprehend's <strong>confidence score</strong> that the sentiment of the text is Positive, Negative, Neutral, Mixed.
            <br></br>
            <br></br>
            The first part, Comprehend's assessment of the sentiment, is a single word response of "POSTIVE", "NEGATIVE", "NEUTRAL", or "MIXED".
            <br></br>
            <br></br>
            The second part, the sentiment scores, is a little different. Comprehend will assign a confidence score to each of the 4 sentiments, regardless of whether or not they are the single word sentiment Comprehend believes the text to be.
            <br></br>
            <br></br>
            For example, given the text "Hey, that's pretty neat!" Comprehend's actual score is as follows: 
            <br></br><br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong>Overall sentiment:</strong> "POSITIVE"
            <br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong>Positive:</strong> 97.39%
            <br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong>Negative:</strong> 0.09%
            <br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong>Neutral:</strong> 24.82%
            <br></br>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong>Mixed:</strong> 0.03%
            <br></br>
            <br></br>
            <h2 className='about-section-heading'>Seeing Your Scores</h2>
            <br></br>
            To help you visualize Comprehend's results we've color coded each of the 4 sentiments as follows:
            <br></br><br></br>
            <Row>
                <Col>
                <Card 
                    className="day-card"
                    style={{backgroundColor: `rgba(${posColor}`}}
                >
                    <Card.Text className='about-cell'>
                      Positive
                    </Card.Text>

                </Card>
                </Col>
                <Col>
                <Card 
                    className="day-card"
                    style={{backgroundColor: `rgba(${negColor}`}}
                >
                    <Card.Text className='about-cell'>
                      Negative
                    </Card.Text>

                </Card>
                </Col>
                <Col>
                <Card 
                    className="day-card"
                    style={{backgroundColor: `rgba(${neutColor}`}}
                >
                    <Card.Text className='about-cell'>
                      Neutral
                    </Card.Text>
                </Card>
                </Col>
                <Col>
                <Card 
                    className="day-card"
                    style={{backgroundColor: `rgba(${mixedColor}`}}
                >
                    <Card.Text className='about-cell'>
                      Mixed
                    </Card.Text>
                </Card>
                </Col>
            </Row>
            <br></br><br></br><br></br>
            For each entry you'll see the color associated with the sentiment for each prompt. 
            Also, the corresponding sentiment color, will be darker, the higher it is. For example, a sentiment score of positive that is 99.9% will show up as a darker green than a sentiment score that is 75.0% positive.
            <br></br><br></br>
            So that's the scoring for each prompt in a single entry. One more output we show you is what we call the <strong>aggregate day score</strong>. This is our calculation and to get it, we take the average of each sentiment across all 3 of your prompts (i.e. we add the positive sentiment score for morning, afternoon and evening prompts and divide the sum by 3 and we do the same for negative neutral and mixed). 
            <br></br><br></br>
            This gives us 4 averages (one for each of the 4 sentiments). We then take the highest of those 4 averages and assign it to your entry as the aggregate day score. This is meant to give a sense of the most predominant sentiment for a given day!
            <br></br><br></br>
            To see this in action, check out your All Entries list, or, go to your Dashboard to see the monthly and weekly breakdown of your sentiment scores. 
            <br></br><br></br>
            Happy journaling!
            <br></br><br></br>
             </div>
        </div>
            )
        }
    }

export default About