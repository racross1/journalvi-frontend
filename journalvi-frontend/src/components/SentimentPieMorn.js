import React from "react";
import Plot from "react-plotly.js";

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

const SentimentPieChartMorn = ({selectedEntries, currentMonthDisplay}) => {
 
    function getSentimentCounts(entries) {
        let pieData = []
        let positive = entries.filter(entry => entry.scores[0].sentiment === 'POSITIVE').length
        let negative = entries.filter(entry => entry.scores[0].sentiment === 'NEGATIVE').length
        let neutral = entries.filter(entry => entry.scores[0].sentiment === 'NEUTRAL').length
        let mixed = entries.filter(entry => entry.scores[0].sentiment === 'MIXED').length
        
        pieData = [...pieData, positive, negative, neutral, mixed]
        
        return pieData
    }
 
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Plot
          data={[
              {
                  values: getSentimentCounts(selectedEntries),
                  labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
                  
                  type: 'pie',
                  marker: {
                    'colors': [
                        `rgb(${posColor})`,
                        `rgb(${negColor})`,
                        `rgb(${neutColor})`,
                        `rgb(${mixedColor})`
                    ]
                  }
                }
            ]}
            layout= {{
                height: 400,
                width: 500,
                
                title: `${currentMonthDisplay} Mornings` 
              }}

        />
      </div>
    );
  
}
export default SentimentPieChartMorn;