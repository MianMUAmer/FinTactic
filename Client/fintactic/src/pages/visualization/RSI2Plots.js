import React from "react";
import Plot from "react-plotly.js";

class RSI2Plots extends React.Component {
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

    var period = 14;
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
            close: stockChartOpenValues,
            // decreasing: { line: { color: "#7F7F7F" } },
            decreasing: { line: { color: "#f7653e" } },
            high: stockChartHighValues,
            // increasing: { line: { color: "#17BECF" } },
            increasing: { line: { color: "#26bf4e" } },
            line: { color: "rgba(31,119,180,1)" },
            low: stockChartLowValues,
            open: stockChartCloseValues,
            type: "candlestick",
            xaxis: "x",
            yaxis: "y",
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
          },
          {
            x: [stockChartXValues[8], stockChartXValues[11]],
            y: [20, 79],
            yaxis: "y2",
            text: ["Oversold (-30%)", "Overbought (+70%)"],
            mode: "text",
          },
        ]}
        layout={this.layout}
        config={{
          responsive: true,
        }}
      />
    );
  }

  //       <Plot
  //         data={[
  //           {
  //             x: stockChartXValues,
  //             close: stockChartOpenValues,
  //             // decreasing: { line: { color: "#7F7F7F" } },
  //             decreasing: { line: { color: "#f7653e" } },
  //             high: stockChartHighValues,
  //             // increasing: { line: { color: "#17BECF" } },
  //             increasing: { line: { color: "#26bf4e" } },
  //             line: { color: "rgba(31,119,180,1)" },
  //             low: stockChartLowValues,
  //             open: stockChartCloseValues,
  //             type: "candlestick",
  //             xaxis: "x",
  //             yaxis: "y",
  //           },
  //           {
  //             x: stockChartXValues,
  //             y: RSIData,
  //             yaxis: "y2",
  //             type: "scatter",
  //           },
  //           //   {
  //           //     type: "scatter",
  //           //     mode: "lines",
  //           //     x: stockChartXValues,
  //           //     y: RSIData,
  //           //     yaxis: "y2",
  //           //     line: {
  //           //       color: "rgb(255, 98, 157)",
  //           //     },
  //           //   },
  //         ]}
  //         layout={this.layout}
  //         config={this.config}
  //       />
  //     );
  //   }

  //   config = {
  //     responsive: true,
  //   };
  layout = {
    shapes: [
      {
        type: "line",
        xref: "paper",
        yref: "y2",
        x0: 0,
        y0: 30,
        x1: 1,
        y1: 30,
        line: {
          color: "#FF4500",
          width: 3,
          dash: "dot",
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
        line: {
          color: "#FF6347",
          width: 3,
          dash: "dot",
        },
      },
    ],
    grid: {
      rows: 2,
      columns: 1,
      pattern: "coupled",
    },
    width: 1000,
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
    // plot_bgcolor: "#e3e3e3",
    // paper_bgcolor: "#e3e3e3",
    plot_bgcolor: "#3d465e",
    paper_bgcolor: "#3d465e",
    dragmode: "zoom",
    margin: {
      r: 45,
      t: 95,
      b: 50,
      l: 45,
    },
    showlegend: false,
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
      domain: [0.5, 1],
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
      domain: [0, 0.4],
      gridcolor: "#e3e3e3",
      linecolor: "#e3e3e3",
      titlefont: { color: "#e3e3e3" },
      tickfont: { color: "#e3e3e3" },
    },
  };
}
//   layout = {
//     grid: {
//       rows: 2,
//       columns: 1,
//       pattern: "coupled",
//       roworder: "bottom to top",
//     },

//     width: 1000,
//     height: 520,
//     title: {
//       text: `${this.props.data.name} ( ${this.props.data.symbol} ) Candle Stick Plot`,
//       font: {
//         color: "#e3e3e3",
//       },
//     },
//     font: {
//       color: "#e3e3e3",
//     },
//     // plot_bgcolor: "#e3e3e3",
//     // paper_bgcolor: "#e3e3e3",
//     plot_bgcolor: "#3d465e",
//     paper_bgcolor: "#3d465e",
//     dragmode: "zoom",
//     margin: {
//       r: 45,
//       t: 95,
//       b: 50,
//       l: 45,
//     },
//     showlegend: false,
//     xaxis: {
//       gridcolor: "#e3e3e3",
//       linecolor: "#e3e3e3",
//       linewidth: 3,
//       autorange: true,
//       domain: [0, 1],
//       title: {
//         text: "Date",
//         font: {
//           color: "#e3e3e3",
//         },
//       },
//       rangeselector: {
//         x: 0,
//         y: 1.2,
//         xanchor: "left",
//         font: { size: 10, color: "000000" },
//         buttons: [
//           {
//             step: "week",
//             stepmode: "backward",
//             count: 1,
//             label: "1 Week",
//           },
//           {
//             step: "month",
//             stepmode: "backward",
//             count: 1,
//             label: "1 Month",
//           },
//           {
//             step: "month",
//             stepmode: "backward",
//             count: 6,
//             label: "6 Months",
//           },
//           {
//             step: "all",
//             label: "All Dates",
//           },
//         ],
//       },
//       type: "date",
//     },
//     yaxis: {
//       autorange: true,
//       domain: [0, 1],
//       type: "linear",
//       gridcolor: "#e3e3e3",
//       linecolor: "#e3e3e3",
//       linewidth: 3,
//       title: {
//         text: "Amount ($)",
//         font: {
//           color: "#e3e3e3",
//         },
//       },
//     },
//     yaxis2: {
//       title: "RSI (%)",
//       range: [0, 100],
//       titlefont: { color: "#e3e3e3" },
//       tickfont: { color: "#e3e3e3" },
//       //   overlaying: "y",
//       //   side: "right",
//     },
//   };
// }

export default RSI2Plots;
