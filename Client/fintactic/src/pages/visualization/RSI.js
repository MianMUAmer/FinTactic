import React from "react";
import Plot from "react-plotly.js";

class RSI extends React.Component {
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

    var RSI = require("technicalindicators").RSI;
    var inputRSI = {
      values: stockChartCloseValues.map(Number),
      period: 14,
    };

    var RSIData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    Array.prototype.push.apply(RSIData, RSI.calculate(inputRSI));

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
            y: RSIData,
            yaxis: "y2",
            line: {
              color: "rgb(255, 98, 157)",
            },
            name: "RSI",
          },
        ]}
        layout={this.layout}
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
    yaxis2: {
      title: "RSI (%)",
      range: [0, 100],
      titlefont: { color: "#e3e3e3" },
      tickfont: { color: "#e3e3e3" },
      overlaying: "y",
      side: "right",
    },
    annotations: [
      {
        x: 1,
        y: 30,
        xref: "paper",
        yref: "y2",
        text: "OverSold (-30%)",
        font: { color: "#e3e3e3" },
        showarrow: true,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: 70,
        xref: "paper",
        yref: "y2",
        text: "OverBought (+70%)",
        font: { color: "#e3e3e3" },
        showarrow: true,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
    ],

    shapes: [
      {
        type: "line",
        xref: "paper",
        yref: "y2",
        x0: 0,
        y0: 30,
        x1: 1,
        y1: 30,
        opacity: 0.9,
        line: {
          color: "#FF4500",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y2",
        x0: 0,
        y0: 70,
        x1: 1,
        y1: 70,
        opacity: 0.9,
        line: {
          color: "#FF6347",
          width: 2,
          dash: "dash",
        },
      },
    ],
  };
}

export default RSI;
