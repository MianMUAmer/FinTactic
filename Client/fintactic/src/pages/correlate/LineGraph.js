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
        config={{ displayModeBar: false }}
      />
    );
  }

  layout = {
    width: 540,
    height: 310,
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
    showlegend: false,
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
