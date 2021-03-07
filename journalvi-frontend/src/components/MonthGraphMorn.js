import React from 'react';
import Plot from 'react-plotly.js';

// --orange-color: rgb(226, 125, 96);
// --light-blue-color: rgb(133,220,186);
// --yellow-color: rgb(232, 168, 124);
// --purple-color: rgb(195, 141, 158);
// --teal-color: rgb( 65,179,163);

//colors
// let posColor = '40,167,69'
// let negColor = '220,53,69'
// let neutColor = '255,193,7'
// let mixedColor = '0,123,255'

let posColor = '65, 179, 163'
let negColor = '226, 125, 96'
let neutColor = '232, 168, 12'
let mixedColor = '195, 141, 158'

const MonthGraphMorn = ({x, yPos, yNeg, yNeut, yMixed, currentMonthDisplay, revision}) => {
    

    return (
        <div style={{ width: '100%', height: '100%' }} id='trend-graph-month'>
        <Plot
            data={[
                {
                    x: x,
                    y: yPos,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Positive',
                    line: {
                        color: `rgb(${posColor})`,
                        width: 3
                    }
                },
                {
                    x: x,
                    y: yNeg,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Negative',
                    line: {
                        color: `rgb(${negColor})`,
                        width: 3
                    }
                },
                {
                    x: x,
                    y: yNeut,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Neutral',
                    line: {
                        color: `rgb(${neutColor})`,
                        width: 3
                    }
                },
                {
                    x: x,
                    y: yMixed,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Mixed',
                    line: {
                        color: `rgb(${mixedColor})`,
                        width: 3
                    }
                }           
            ]}
            layout={{
            width: 950,
            height: 525,
            yaxis: {
                tickformat: ',.0%',
                range: [0,1],
                title: 'Prompt Sentiment Scores'
            },
            xaxis: {
                title: 'Day'
            },
            title: `${currentMonthDisplay} Mornings`
            
            }}
            revision={revision}
        />
       
      </div>
    );
  }


export default MonthGraphMorn
