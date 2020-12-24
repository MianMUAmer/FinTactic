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
            // line: { color: "#17BECF" },
          },
          {
            type: "scatter",
            mode: "lines",
            name: `${symbol} Low`,
            x: stockChartXValues,
            y: stockChartLowValues,
            // line: { color: "#7F7F7F" },
          },
        ]}
        layout={this.layout}
      />
    );
  }

  layout = {
    // width: 1245,
    width: window.innerWidth - 35,
    height: 520,
    title: `${this.props.data.name} ( ${this.props.data.symbol} ) Line Graph`,
    dragmode: "zoom",
    margin: {
      r: 45,
      t: 85,
      b: 20,
      l: 45,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      rangeselector: {
        x: 0,
        y: 1.2,
        xanchor: "left",
        font: { size: 10 },
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
      rangeslider: {},
      type: "date",
    },
    yaxis: {
      autorange: true,
      type: "linear",
    },
  };
}

export default LineGraph;
