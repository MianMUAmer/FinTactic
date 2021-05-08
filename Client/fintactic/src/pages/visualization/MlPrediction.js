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
      mlStartDate,
      mlEndData,
      predType,
      predictedValues,
    } = this.state;
    console.log(this.state, "ssssss");
    // if (predType === "Old Data") {
    //   var pD = [];
    //   if (mlStartDate > 0) {
    //     for (var k = 0; k < mlStartDate; k++) {
    //       pD.push({});
    //     }
    //     if (mlEndData < stockChartCloseValues.length) {
    //       for (
    //         var l = mlStartDate, m = 0;
    //         l < mlEndData - mlStartDate;
    //         l++, m++
    //       ) {
    //         pD.push(predictedValues[m]);
    //       }
    //       for (var n = j; n < stockChartCloseValues.length - mlEndData; n++) {
    //         pD.push({});
    //       }
    //     } else {
    //       for (
    //         var l = mlStartDate, m = 0;
    //         l < stockChartCloseValues.length;
    //         l++, m++
    //       ) {
    //         pD.push(predictedValues[m]);
    //       }
    //     }
    //   } else {
    //     if (mlEndData < stockChartCloseValues.length) {
    //       for (var k = mlStartDate; k < mlEndData; k++) {
    //         pD.push(predictedValues[k]);
    //       }
    //       for (var n = j; n < stockChartCloseValues.length; n++) {
    //         pD.push({});
    //       }
    //     } else {
    //       for (var i = mlStartDate; i < mlEndData; i++) {
    //         pD.push(predictedValues[i]);
    //       }
    //     }
    //   }
    // } else if (predType === "Future Data") {
    //   for (var i = 0; i < mlStartDate; i++) {
    //     pD.push({});
    //   }
    //   for (var j = mlStartDate, m = 0; j < mlEndData; j++, m++) {
    //     pD.push(predictedValues[m]);
    //   }
    // }
    // console.log(pD, "pD");

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
