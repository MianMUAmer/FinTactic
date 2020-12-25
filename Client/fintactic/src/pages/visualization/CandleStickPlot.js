import React from "react";
import Plot from "react-plotly.js";

class CandleStickPlot extends React.Component {
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
    return (
      <Plot
        data={[
          {
            x: stockChartXValues,
            close: stockChartOpenValues,
            decreasing: { line: { color: "#7F7F7F" } },
            high: stockChartHighValues,
            increasing: { line: { color: "#17BECF" } },
            line: { color: "rgba(31,119,180,1)" },
            low: stockChartLowValues,
            open: stockChartCloseValues,
            type: "candlestick",
            xaxis: "x",
            yaxis: "y",
          },
        ]}
        layout={this.layout}
      />
    );
  }

  layout = {
    width: 1000,
    height: 520,
    title: `${this.props.data.name} ( ${this.props.data.symbol} ) Candle Stick Plot`,
    dragmode: "zoom",
    margin: {
      r: 45,
      t: 95,
      b: 50,
      l: 45,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
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
      title: "Date",
      type: "date",
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      type: "linear",
    },
  };
}

export default CandleStickPlot;
