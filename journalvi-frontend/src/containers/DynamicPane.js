import React from 'react' 
import PageHeader from '../components/PageHeader.js'
import EntryList from './EntryList.js'
import CreateEntry from '../components/CreateEntry.js'
import Welcome from '../components/Welcome.js'
import ShowEntry from '../components/ShowEntry.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Switch} from 'react-router-dom'



export default class DynamicPane extends React.Component{
    render(){
        console.log(this.props.entries)
        return (
        <div  id="dynamic-pane" className='right-page'>
            <PageHeader/>    
            <Switch>
                <Route exact path="/welcome" component={Welcome}/>
                <Route exact path="/entries/new" component={CreateEntry} />
                <Route exact path="/entries" render={() => {
                    return <EntryList entries={this.props.entries}/>
                    }} />
                <Route exact path="/entries/:id" render={(routerProps) => {
                    let entry = this.props.entries.find(ent => ent.id === parseInt(routerProps.match.params.id))
                return <ShowEntry entry={entry}/>
            
            }}/>
            </Switch>
  
        </div>
      );
      }
    
  
}
