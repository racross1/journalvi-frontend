import React from 'react' 
import PageHeader from '../components/PageHeader.js'
import EntryList from './EntryList.js'
import CreateEntry from '../components/CreateEntry.js'
import ShowEntry from '../components/ShowEntry.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Dashboard from './Dashboard.js'
import About from '../components/About.js'
// import { connect } from 'react-redux';


class DynamicPane extends React.Component{
    
    render(){
        return (
        <div  id="dynamic-pane" className='right-page'>
            <PageHeader/>    
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/about' />
                </Route>
                <Route exact path='/about' component={About}></Route>
                <Route exact path="/entries/new" component={CreateEntry} />
                <Route exact path="/entries" render={() => {
                    return this.props.requesting ? "Loading Page..." : <EntryList />
                    }} />
                <Route exact path="/entries/:id" render={(routerProps) => {
                    let entry = this.props.entries.find(ent => ent.id === parseInt(routerProps.match.params.id))
                return <ShowEntry entry={entry}/>
            
            }}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
  
        </div>
      );
      }
    
  
}

// function mapStateToProps (state) {
//     debugger
//     return {
//         entries: state.entryReducer.entries
//     }

// }

// export default connect(mapStateToProps)(DynamicPane);

export default DynamicPane
