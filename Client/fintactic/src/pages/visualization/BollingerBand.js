import React from "react";
import Plot from "react-plotly.js";

class BollingerBand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: this.props.data.stockChartXValues,
      stockChartOpenValues: this.props.data.stockChartOpenValues,
      stockChartHighValues: this.props.data.stockChartHighValues,
      stockChartLowValues: this.props.data.stockChartLowValues,
      stockChartCloseValues: this.props.data.stockChartCloseValues,
    };
  }

  render() {
    const {
      stockChartXValues,
      stockChartOpenValues,
      stockChartHighValues,
      stockChartLowValues,
      stockChartCloseValues,
    } = this.state;

    // var BB = require('technicalindicators').BollingerBands
    var B = require("technicalindicators").BollingerBands;
    var period = 20;
    var bMiddle = [];
    var bUpper = [];
    var bLower = [];
    var BollingerData = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    var input = {
      period: period,
      values: stockChartCloseValues.map(Number),
      stdDev: 2,
    };
    Array.prototype.push.apply(BollingerData, B.calculate(input));
    BollingerData.forEach((element) => {
      bUpper.push(element.upper);
      bMiddle.push(element.middle);
      bLower.push(element.lower);
    });

    return (
      <Plot
        data={[
          {
            x: stockChartXValues,
            close: stockChartCloseValues,
            decreasing: { line: { color: "#f7653e" } },
            high: stockChartHighValues,
            increasing: { line: { color: "#26bf4e" } },
            line: { color: "rgba(31,119,180,1)" },
            low: stockChartLowValues,
            open: stockChartOpenValues,
            type: "candlestick",
            xaxis: "x",
            yaxis: "y",
            name: "CandleSticks",
          },
          {
            type: "scatter",
            mode: "lines",
            x: stockChartXValues,
            y: bUpper,
            line: {
              color: "rgb(255, 98, 157)",
            },
            name: "UpperBound ( +2\u03C3 )",
          },
          {
            type: "scatter",
            mode: "lines",
            x: stockChartXValues,
            y: bMiddle,
            name: "Moving Average",
          },
          {
            type: "scatter",
            mode: "lines",
            x: stockChartXValues,
            y: bLower,
            name: "LowerBound ( -2\u03C3 )",
          },
        ]}
        layout={this.layout}
        config={{ displayModeBar: false }}
      />
    );
  }

  layout = {
    width: 1030,
    height: 520,
    title: {
      text: `${this.props.data.name} ( ${this.props.data.symbol} ) Candle Stick Plot`,
      font: {
        color: "#e3e3e3",
      },
    },
    font: {
      color: "#e3e3e3",
    },
    plot_bgcolor: "#454f6b",
    paper_bgcolor: "#454f6b",
    dragmode: "zoom",
    margin: {
      r: 45,
      t: 95,
      b: 50,
      l: 52,
    },
    showlegend: true,
    xaxis: {
      gridcolor: "#e3e3e3",
      linecolor: "#e3e3e3",
      linewidth: 3,
      autorange: true,
      domain: [0, 1],
      title: {
        text: "Date",
        font: {
          color: "#e3e3e3",
        },
      },
      rangeslider: {
        visible: false,
      },
      rangeselector: {
        x: 0,
        y: 1.2,
        xanchor: "left",
        font: { size: 10, color: "000000" },
        buttons: [
          {
            step: "week",
            stepmode: "backward",
            count: 1,
            label: "1 Week",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 1,
            label: "1 Month",
          },
          {
            step: "month",
            stepmode: "backward",
            count: 6,
            label: "6 Months",
          },
          {
            step: "all",
            label: "All Dates",
          },
        ],
      },
      type: "date",
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      type: "linear",
      gridcolor: "#e3e3e3",
      linecolor: "#e3e3e3",
      linewidth: 3,
      title: {
        text: "Amount ($)",
        font: {
          color: "#e3e3e3",
        },
      },
    },
  };
}

export default BollingerBand;
