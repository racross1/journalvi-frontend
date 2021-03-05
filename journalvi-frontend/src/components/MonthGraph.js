import React from "react";
import Plot from "react-plotly.js";
import {format, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from "date-fns";
import { connect } from 'react-redux';


// let currentMonth = this.props.currentMonth
// let data = []
// let layout = {}

class MonthGraph extends React.Component {
    
    constructor(props) {
        super(props);
       
        let xAxis = Object.keys(this.createXYAxisObj(this.props.selectedEntries, "POSITIVE"))
        let yPosAxis = Object.values(this.createXYAxisObj(this.props.selectedEntries, "POSITIVE"))
        let yNegAxis = Object.values(this.createXYAxisObj(this.props.selectedEntries, "NEGATIVE"))
        let yNeutAxis =  Object.values(this.createXYAxisObj(this.props.selectedEntries, "NEUTRAL"))

        let month = format(this.props.currentMonth, 'MMMM')
        console.log(xAxis)
        this.state = {
            x: xAxis,
            yPos: yPosAxis,
            yNeg: yNegAxis,
            yNeut: yNeutAxis,
            currentMonthDisplay: month
        }
      
    }



createXYAxisObj= (entries, sentiment) => {
     let dateFormat = "d"
     let axisObj = {}
     entries.forEach(entry => {
        let dateNum = parseInt(format(this.parseEntryDate(entry.date), dateFormat))
        axisObj[dateNum] = this.getScoreAverages(entry, sentiment)
    })
    //pop and push 1 and end of month if not included
    //these will be the days of the week

// console.log(dates.sort((a,b) => a - b))

   return axisObj
    // return dates.sort((a,b) => a - b)

}

getScoreAverages = (entry, sentiment) => {
    //pos scores only rn
    let total = 0;
    console.log(entry.scores)
    switch(sentiment) {
        case 'POSITIVE':
            entry.scores.forEach(score => {
                total += score.pos_score
            })
            return total / entry.scores.length;
           
        case 'NEGATIVE':
            entry.scores.forEach(score => {
                total += score.neg_score
            })
            return total / entry.scores.length;

        case 'NEUTRAL':
            entry.scores.forEach(score => {
                total += score.neut_score
            })
            return total / entry.scores.length;

    }
//    entry.scores.forEach(score => {
//        total += score.pos_score
//    })
//    console.log(total)
//     let avg = total / entry.scores.length;
    
   
//     return avg
}


parseEntryDate = (date) => {
    let d = new Date(date)
    
    return addDays(d, 1)


}


  render() {
    console.log(this.props.selectedEntries)
    return (
        <div style={{ width: "100%", height: "100%" }}>
        <Plot
            data={[
                {
                    x: this.state.x,
                    y: this.state.yPos,
                    type: "scatter",
                    mode: "lines+markers",
                    name: 'positive',
                    line: {
                        color: 'rgb(40,167,69)',
                        width: 3
                    }
                },
                {
                    x: this.state.x,
                    y: this.state.yNeg,
                    type: "scatter",
                    mode: "lines+markers",
                    name: 'negative',
                    line: {
                        color: 'rgb(220,53,69)',
                        width: 3
                    }
                },
                {
                    x: this.state.x,
                    y: this.state.yNeut,
                    type: "scatter",
                    mode: "lines+markers",
                    name: 'neutral',
                    line: {
                        color: 'rgb(255,193,7)',
                        width: 3
                    }
                }      
            ]}
            layout={{
            width: 736,
            height: 450,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            title: `${this.state.currentMonthDisplay} Sentiment Trend`
            
            }}
                    />
       
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
    
//     // console.log(state.timeReducer.currentMonth)
    
//     return {currentMonth: state.timeReducer.currentMonth}
// }


// export default connect(mapStateToProps)(MonthTrend);

export default MonthGraph


// prior code

  // this.state = {
        //     data: [
        //       {
        //         x:[1,31],
        //         y: [3, 5, 1, 7],
               
        //         type: 'scatter',
        //         name: 'Vendor'
        //       },
        //       {
        //         // x: this.createXAxisArr(this.props.entries),
        //         x:[1,31],
        //         y: [3, 5, 1, 7],
               
        //         type: 'scatter',
        //         name: 'Provider'
        //       }],
        //     layout: {
        //       height: 400,
        //       width: 600,
        //       title: "Area chart"
        //     }
        //   };

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

// componentDidMount(){
//     this.setState({
//         x: Object.keys(this.createXYAxisObj(this.props.selectedEntries)),
//         y: Object.values(this.createXYAxisObj(this.props.selectedEntries)),
//     })
// }
    
    
    // let currentMonth = this.props.currentMonth
    // // this.setState({currentMonth: currentMonth})

    // let selectedEntries = this.props.entries.filter(entry => isSameMonth(this.parseEntryDate(entry.date), this.props.currentMonth))
    // this.createXAxisArr(selectedEntries)
    
    // console.log('yes')
    // console.log(selectedEntries)

    // let monthStart = startOfMonth(this.props.currentMonth);
    // let monthEnd = endOfMonth(this.props.currentMonth);

    // let dateFormat = "d"

    // let formattedStart = format(monthStart, dateFormat)
    // let formattedEnd = format(monthEnd, dateFormat)
    // this.createXYAxisObj(selectedEntries)
   
// }

// componentDidUpdate(){
//     console.log('update')

// }