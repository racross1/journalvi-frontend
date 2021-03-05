import React from 'react';
import Plot from 'react-plotly.js';



const MonthGraphEv = ({x, yPos, yNeg, yNeut, yMixed, currentMonthDisplay, revision}) => {
    

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
                        color: 'rgb(40,167,69)',
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
                        color: 'rgb(220,53,69)',
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
                        color: 'rgb(255,193,7)',
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
                        color: 'rgb(0,123,255)',
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
            title: `${currentMonthDisplay} Evenings`
            
            }}
            revision={revision}
        />
       
      </div>
    );
  }


export default MonthGraphEv
