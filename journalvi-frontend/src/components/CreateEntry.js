import React from 'react'
import { connect } from 'react-redux';
import { addEntry } from '../actions/entries.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import {compose} from "redux"
import { withRouter } from "react-router"

class CreateEntry extends React.Component{
    state = {
        'How was your morning?': '',
        'How was your afternoon?': '',
        'How was your evening?': '',
        date: null,
        redirect: false,
        entryId: false
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        let token = sessionStorage.getItem('token')
        
        let stateObj = this.state

        let entryObj = {}
        let i = 1
        while (i < 5) {
            for (const pro in stateObj) {
                entryObj[`p${i}`] = {prompt: pro, response: this.state[pro]}
                i++
                }
            }
        
       
        entryObj.user_id = this.props.user.user.id
        e.target.reset()

        fetch('http://127.0.0.1:3000/entries', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(entryObj)
        })
        .then(resp => resp.json())
        .then(entry => {
            this.props.addEntry(entry)
            this.setState({redirect: true})
            this.setState({entryId: entry.id})
        })
    }

    componentWillUnmount = () => {
        this.setState({
            'How was your morning?': '',
            'How was your afternoon?': '',
            'How was your evening?': '',
            date: null,
            redirect: false,
            entryId: false
        })
    }

    render(){
        return (
        <div  className='right-pane'>
            {this.state.entryId ?  <Redirect to={`/entries/${this.state.entryId}`}/> :
            <Form id='entry-form' onSubmit={this.handleSubmit}>
                
                <Form.Group controlId="form-response-3">
                    <Form.Label>Entry Date</Form.Label>
                    <Form.Control type="date" name='date' onChange={this.handleChange}/>
                   
                </Form.Group>

                <Form.Group controlId="form-response-1">
                    <Form.Label>1. How was your morning?</Form.Label>
                    <Form.Control as="textarea" rows={3} name='How was your morning?' onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Limit [tbd] characters
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="form-response-2">
                    <Form.Label>2. How was your afternoon?</Form.Label>
                    <Form.Control as="textarea" rows={3} name='How was your afternoon?' onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Limit [tbd] characters
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="form-response-3">
                    <Form.Label>3. How was your evening?</Form.Label>
                    <Form.Control as="textarea" rows={3} name='How was your evening?' onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Limit [tbd] characters
                    </Form.Text>
                </Form.Group>

               

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
            }
        </div>
            )
        }
    }

const mapStateToProps = (state) => {
    return {user: state.userReducer.userData}
}


export default compose(
    withRouter, 
    connect(mapStateToProps, { addEntry })
    )(CreateEntry);