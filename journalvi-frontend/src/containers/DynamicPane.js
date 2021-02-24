import React from 'react' 
import PageHeader from '../components/PageHeader.js'
import EntryList from './EntryList.js'
import CreateEntry from '../components/CreateEntry.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route} from 'react-router-dom'


export default class DynamicPane extends React.Component{
    render(){
        return (
        <div  id="dynamic-pane" className='right-page'>
            <PageHeader/>    

            <Route exact path="/entries/new" component={CreateEntry} />
            <Route exact path="/entries" component={EntryList} />
       
  
        </div>
      );
      }
    
  
}