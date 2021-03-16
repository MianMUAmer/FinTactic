import React from "react";
import Plot from "react-plotly.js";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.data.symbol,
      stockChartXValues: this.props.data.stockChartXValues,
      stockChartHighValues: this.props.data.stockChartHighValues,
      stockChartLowValues: this.props.data.stockChartLowValues,
    };
  }

  render() {
    const {
      stockChartXValues,
      stockChartHighValues,
      stockChartLowValues,
      symbol,
    } = this.state;
    return (
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines",
            name: `${symbol} High`,
            x: stockChartXValues,
            y: stockChartHighValues,
            line: { color: "#26bf4e" },
          },
          {
            type: "scatter",
            mode: "lines",
            name: `${symbol} Low`,
            x: stockChartXValues,
            y: stockChartLowValues,
            line: { color: "#f7653e" },
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
      text: `${this.props.data.name} ( ${this.props.data.symbol} ) Line Graph`,
      font: {
        color: "#e3e3e3",
      },
    },
    font: {
      color: "#e3e3e3",
    },
    dragmode: "zoom",
    plot_bgcolor: "#454f6b",
    paper_bgcolor: "#454f6b",
    margin: {
      r: 45,
      t: 95,
      b: 50,
      l: 50,
    },
    showlegend: true,
    xaxis: {
      gridcolor: "#e3e3e3",
      linecolor: "#e3e3e3",
      linewidth: 3,
      autorange: true,
      rangeslider: {
        visible: false,
      },
      title: {
        text: "Date",
        font: {
          color: "#e3e3e3",
        },
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

export default LineGraph;
