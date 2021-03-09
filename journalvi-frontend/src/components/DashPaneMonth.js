import React from "react";
import Table from 'react-bootstrap/Table'
import {format, addDays} from "date-fns";



let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

const DashPaneMonth = ({selectedEntries}) => {
 
    function getMostPosDay(entries) {    
          let posAvgs = []
          let posAvgsObj = {}
          
          const dateFormat = "MMM d yyyy"
          entries.forEach(entry => {
            let total = 0
            
            entry.scores.forEach(score => {
              
              total += score.pos_score
            })
            let avg = total / entry.scores.length
            posAvgs.push(avg)
            posAvgsObj[avg] = entry
          })
          
          let maxPosAvg = maxInArr(posAvgs)
          let result = [format(parseEntryDate(posAvgsObj[maxPosAvg].date), dateFormat), `${(maxPosAvg * 100).toFixed(1)}%`]
          return result
    }

    function getMostNegDay(entries) {    
      let negAvgs = []
      let negAvgsObj = {}
      
      const dateFormat = "MMM d yyyy"
      entries.forEach(entry => {
        let total = 0
        
        entry.scores.forEach(score => {
          
          total += score.neg_score
        })
        let avg = total / entry.scores.length
        negAvgs.push(avg)
        negAvgsObj[avg] = entry
      })
      
      let maxNegAvg = maxInArr(negAvgs)
      let result = [format(parseEntryDate(negAvgsObj[maxNegAvg].date), dateFormat), `${(maxNegAvg * 100).toFixed(1)}%`]
      return result
}

    function parseEntryDate(date){
      let d = new Date(date)
      let dPlusOne = addDays(d, 1);
      return dPlusOne
    }
 
  function maxInArr(arr) {
    let sorted = arr.sort((a, b) => a-b).reverse()
  
      return sorted[0]
  }

  function getMostPosToD(entries) {
    let compareData = {}
    
    compareData['Morning'] = entries.filter(entry => entry.scores[0].sentiment === 'POSITIVE').length
    compareData['Afternoon'] = entries.filter(entry => entry.scores[1].sentiment === 'POSITIVE').length
    compareData['Evening'] = entries.filter(entry => entry.scores[2].sentiment === 'POSITIVE').length
   
    let sortable = [];
for (let timeOfDay in compareData) {
    sortable.push([timeOfDay, compareData[timeOfDay]]);
}

  let max = sortable.sort((a, b) => a[1] - b[1])[2][0]
  return max   
}


function getMostNegToD(entries) {
  let compareData = {}
  
  compareData['Morning'] = entries.filter(entry => entry.scores[0].sentiment === 'NEGATIVE').length
  compareData['Afternoon'] = entries.filter(entry => entry.scores[1].sentiment === 'NEGATIVE').length
  compareData['Evening'] = entries.filter(entry => entry.scores[2].sentiment === 'NEGATIVE').length
 
  let sortable = [];
for (let timeOfDay in compareData) {
  sortable.push([timeOfDay, compareData[timeOfDay]]);
}

let max = sortable.sort((a, b) => a[1] - b[1])[2][0]
return max   
}
   
function getMostPrevalentSentiment(entries) {
  let compareData = {}
  compareData['Positive'] = entries.filter(entry => entry.agg_score_key === 'POSITIVE').length
  compareData['Negative'] = entries.filter(entry => entry.agg_score_key === 'NEGATIVE').length
  compareData['Neutral'] = entries.filter(entry => entry.agg_score_key === 'NEUTRAL').length
  compareData['Mixed'] = entries.filter(entry => entry.agg_score_key === 'MIXED').length
  
  let sortable = [];
  for (let sentiment in compareData) {
    sortable.push([sentiment, compareData[sentiment]]);
  }
  
  let max = sortable.sort((a, b) => a[1] - b[1])[3][0]

  return max   
}

    return (
      
      <div className='month-summary-content' style={{ width: "100%", height: "100%" }}>
        <Table>
        <thead>
                <tr>
                    <th>Most Positive Day:</th>
                    <th>Entry Agg. Positive Score:</th>
                </tr>
          </thead>
            <tr>
              <td>{selectedEntries.length > 0 ? getMostPosDay(selectedEntries)[0] : ''}</td>
              <td>{selectedEntries.length > 0 ? getMostPosDay(selectedEntries)[1] : ''}</td>
            </tr>

            <thead>
                <tr>
                    <th>Most Negative Day:</th>
                    <th>Entry Agg. Negative Score:</th>
                </tr>
          </thead>
            <tr>
              <td>{selectedEntries.length > 0 ? getMostNegDay(selectedEntries)[0] : ''}</td>
              <td>{selectedEntries.length > 0 ? getMostNegDay(selectedEntries)[1] : ''}</td>
            </tr>
            <thead>
                <tr>
                    <th>Most Positive Time of Day:</th>
                    <th>Most Negative Time of Day:</th>
                </tr>
          </thead>
            <tr>
              <td>{selectedEntries.length > 0 ? getMostPosToD(selectedEntries) : ''}</td>
              <td>{selectedEntries.length > 0 ? getMostNegToD(selectedEntries) : ''}</td>
            </tr>
            <thead>
                <tr>
                    <th>Most Prevalent Sentiment:</th>
                    <th></th>
                    
                </tr>
          </thead>
            <tr>
              <td>{selectedEntries.length > 0 ? getMostPrevalentSentiment(selectedEntries) : ''}</td>
              <td></td>
              
            </tr>

           

          </Table>
        
      </div>
    );
  
}
export default DashPaneMonth;