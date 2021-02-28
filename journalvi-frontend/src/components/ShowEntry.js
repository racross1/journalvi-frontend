import React from 'react'
// import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'


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
    
    render(){
        console.log(this.props.entry)
        return (
            <div> 
                {this.state.entry ? this.state.entry.agg_score : null}
            hi
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