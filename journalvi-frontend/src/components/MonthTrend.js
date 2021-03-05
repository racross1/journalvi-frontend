// import React from "react";
// import Plot from "react-plotly.js";
// import {format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from "date-fns";
// import { connect } from 'react-redux';

// class MonthTrend extends React.Component {
    
//     state = {
//         currentMonth: this.props.currentMonth
//            };

// componentDidUpdate(){
//     //do version of this on component did mount too
//         if(this.state.currentMonth !== this.props.currentMonth){ 
//             // this.setState({currentMonth: this.props.currentMonth})
//         //     let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), this.props.currentMonth))
//         //     let xAxis = this.createXAxisArr(selectedEntries)
//         //     this.setState({data: {
//         //         ...this.state.data, 
//         //         x: xAxis,
//         //     }
//         // })
//          }
//      }

// createXAxisArr= (entries) => {
//      let dateFormat = "d"
//     let dates = entries.map(entry => parseInt(format(this.parseEntryDate(entry.date), dateFormat)))
//     //pop and push 1 and end of month if not included
//     //these will be the days of the week


//     return dates.sort((a,b) => a - b)

// }


// componentDidMount(){
//     let currentMonth = this.props.currentMonth
//     // this.setState({currentMonth: currentMonth})

//     let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), currentMonth))
    
//     // console.log(selectedEntries)

//     // let monthStart = startOfMonth(this.props.currentMonth);
//     // let monthEnd = endOfMonth(this.props.currentMonth);

//     // let dateFormat = "d"

//     // let formattedStart = format(monthStart, dateFormat)
//     // let formattedEnd = format(monthEnd, dateFormat)
    
   
// }

// parseEntryDate = (date) => {
//     let d = new Date(date)
    
//     return addDays(d, 1)


// }


//   render() {
//     console.log(this.state.currentMonth)
//     return (
//       <div >
//           <M>
//       </div>
//     );
//   }
// }

// // const mapStateToProps = (state) => {
    
// //     // console.log(state.timeReducer.currentMonth)
    
// //     return {currentMonth: state.timeReducer.currentMonth}
// // }


// // export default connect(mapStateToProps)(MonthTrend);

// export default MonthTrend
