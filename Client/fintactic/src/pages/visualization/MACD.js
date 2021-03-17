import React from "react";
import Plot from "react-plotly.js";

class MACD extends React.Component {
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

    var MACD = require("technicalindicators").MACD;
    var macdInput = {
      values: stockChartCloseValues.map(Number),
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    };

    // console.log(MACD.calculate(macdInput));
    // console.log(stockChartCloseValues);

    var MACDData = [];
    var SignalData = [];
    var HistData = [];
    var MACDDataAll = [
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
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    Array.prototype.push.apply(MACDDataAll, MACD.calculate(macdInput));
    console.log(MACDDataAll);
    MACDDataAll.forEach((element) => {
      MACDData.push(element.MACD);
      SignalData.push(element.signal);
      HistData.push(element.histogram);
    });

    console.log(MACDData);
    console.log(SignalData);
    console.log(HistData);

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
            y: MACDData,
            yaxis: "y2",
            line: {
              color: "rgb(255, 98, 157)",
            },
            name: "MACD Line",
          },
          {
            type: "scatter",
            mode: "lines",
            x: stockChartXValues,
            y: SignalData,
            yaxis: "y2",
            name: "Signal Line",
          },
          {
            x: stockChartXValues,
            y: HistData,
            yaxis: "y2",
            type: "bar",
            name: "Histogram",
            marker: {
              color: "#ffbf00",
            },
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
    legend: {
      x: 1.05,
      y: 1,
    },
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
      title: "MACD",
      //   autorange: true,
      titlefont: { color: "#e3e3e3" },
      tickfont: { color: "#e3e3e3" },
      overlaying: "y",
      side: "right",
    },
  };
}

export default MACD;
