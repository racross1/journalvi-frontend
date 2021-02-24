import React from 'react' 
import Navbar from '../components/Navbar.js'
import DynamicPane from './DynamicPane.js'


export default class MainPage extends React.Component {
    render(){
        return (
        <div className="main-page">
        <Navbar />
        <DynamicPane />
        </div>
    );
    }
}
