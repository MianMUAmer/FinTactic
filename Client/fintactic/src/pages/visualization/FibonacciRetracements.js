import React from "react";
import Plot from "react-plotly.js";
import { getFibRetracement, levels } from "fib-retracement";

class FibonacciRetracements extends React.Component {
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

    console.log(this.props.fibData, "fib");

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
    annotations: [
      {
        x: 1,
        y: this.props.fibData[0],
        xref: "paper",
        yref: "y",
        text: "0",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[0.236],
        xref: "paper",
        yref: "y",
        text: "0.236",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[0.382],
        xref: "paper",
        yref: "y",
        text: "0.382",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[0.5],
        xref: "paper",
        yref: "y",
        text: "0.50",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[0.618],
        xref: "paper",
        yref: "y",
        text: "0.618",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[0.786],
        xref: "paper",
        yref: "y",
        text: "0.786",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
      {
        x: 1,
        y: this.props.fibData[1],
        xref: "paper",
        yref: "y",
        text: "1",
        font: { color: "#e3e3e3", size: 15 },
        showarrow: false,
        xanchor: "left",
        ax: 25,
        ay: 0,
      },
    ],

    shapes: [
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0],
        x1: 1,
        y1: this.props.fibData[0],
        opacity: 1,
        line: {
          color: "#e384c3",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0.236],
        x1: 1,
        y1: this.props.fibData[0.236],
        opacity: 1,
        line: {
          color: "#d38bf7",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0.382],
        x1: 1,
        y1: this.props.fibData[0.382],
        opacity: 1,
        line: {
          color: "#f09598",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0.5],
        x1: 1,
        y1: this.props.fibData[0.5],
        opacity: 1,
        line: {
          color: "#8b8ef0",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0.618],
        x1: 1,
        y1: this.props.fibData[0.618],
        opacity: 1,
        line: {
          color: "#5fbbed",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[0.786],
        x1: 1,
        y1: this.props.fibData[0.786],
        opacity: 1,
        line: {
          color: "#5cd6aa",
          width: 2,
          dash: "dash",
        },
      },
      {
        type: "line",
        xref: "paper",
        yref: "y",
        x0: 0,
        y0: this.props.fibData[1],
        x1: 1,
        y1: this.props.fibData[1],
        opacity: 1,
        line: {
          color: "#f79295",
          width: 2,
          dash: "dash",
        },
      },
    ],
  };
}

export default FibonacciRetracements;
