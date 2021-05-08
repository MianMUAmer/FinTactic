import moment from "moment";
import React from "react";
import Plot from "react-plotly.js";

class MlPrediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      symbol: this.props.data.symbol,
      stockChartXValues: this.props.data.stockChartXValues,
      stockChartCloseValues: this.props.data.stockChartCloseValues,
      predictedValues: this.props.data.stockPredictedValues,
      predType: this.props.predType,
    };
  }

  render() {
    const {
      stockChartXValues,
      stockChartCloseValues,
      symbol,
      predType,
      predictedValues,
    } = this.state;
    console.log(this.state, "ssssss");

    return (
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines",
            name: `${symbol} Close`,
            x: stockChartXValues,
            y: stockChartCloseValues,
            line: { color: "#fd8c38" },
          },
          {
            type: "scatter",
            mode: "lines",
            name: `${symbol} Prediction`,
            x: stockChartXValues,
            y: predictedValues,
            line: {
              color: "#26bf4e",
            },
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
      text: `${this.props.data.name} ( ${this.props.data.symbol} ) ML Prediction Plot`,
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

export default MlPrediction;
