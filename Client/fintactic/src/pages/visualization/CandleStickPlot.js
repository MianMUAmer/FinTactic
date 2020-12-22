import React from "react";
import Plot from 'react-plotly.js';

class CandleStickPlot extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.data);
        this.state = {
          stockChartXValues: this.props.data.stockChartXValues,
          stockChartOpenValues: this.props.data.stockChartOpenValues,
          stockChartHighValues: this.props.data.stockChartHighValues,
          stockChartLowValues: this.props.data.stockChartLowValues,
          stockChartCloseValues: this.props.data.stockChartCloseValues
        }
    }

    render() {
        const {stockChartXValues, stockChartOpenValues, stockChartHighValues, stockChartLowValues, stockChartCloseValues} = this.state;
        return (
            <Plot
          data={[
            {
              x: stockChartXValues,
              close: stockChartOpenValues,
              decreasing: {line: {color: '#7F7F7F'}}, 
              high: stockChartHighValues,
              increasing: {line: {color: '#17BECF'}},               
              line: {color: 'rgba(31,119,180,1)'},              
              low: stockChartLowValues,             
              open: stockChartCloseValues,             
              type: 'candlestick', 
              xaxis: 'x', 
              yaxis: 'y',
            },
          ]}
          layout={layout}
      />
        )
    }

}

var layout = {
    width: 920, height: 540, title: 'Candle Stick Plot',
    dragmode: 'zoom', 
    margin: {
      r: 10, 
      t: 95, 
      b: 50, 
      l: 60
    }, 
    showlegend: false, 
    xaxis: {
      autorange: true, 
      domain: [0, 1], 
      // range: ['2017-01-03 12:00', '2017-02-15 12:00'], 
      // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
      rangeselector: {
        x: 0,
        y: 1.2,
        xanchor: 'left',
        font: {size:8},
        buttons: [{
            step: 'week',
            stepmode: 'backward',
            count: 1,
            label: '1 Week'
        },{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1 Month'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6 Months'
        }, {
            step: 'all',
            label: 'All Dates'
        }]
      },
      title: 'Date', 
      type: 'date'
    }, 
    yaxis: {
      autorange: true, 
      domain: [0, 1], 
      // range: [114.609999778, 137.410004222], 
      type: 'linear'
    }
  };

export default CandleStickPlot;
