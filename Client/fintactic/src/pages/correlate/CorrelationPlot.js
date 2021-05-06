import React from "react";
import Plot from "react-plotly.js";

class CorrelationPlot extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props, "serer");
    this.state = {
      xSymbol: this.props.assetX ? this.props.assetX : "AMZN",
      ySymbol: this.props.assetY ? this.props.assetY : "AMZN",
      pC: this.props.pC ? this.props.pC : 1,
      lineYCord: this.props.lineYCord,
      xStockChartXValues: this.props.data.xStockChartXValues,
      xStockChartCloseValues: this.props.data.xStockChartCloseValues,
      yStockChartCloseValues: this.props.data.yStockChartCloseValues,
    };
  }

  render() {
    const {
      xStockChartCloseValues,
      xStockChartXValues,
      xSymbol,
      ySymbol,
      yStockChartCloseValues,
      lineYCord,
    } = this.state;
    console.log(this.state, "stateeee");
    return (
      <div>
        <Plot
          data={[
            {
              x: xStockChartCloseValues.map(Number),
              y: yStockChartCloseValues.map(Number),
              mode: "markers",
              type: "scatter",
              name: { xSymbol },
              text: xStockChartXValues,
              textfont: {
                family: "Raleway, sans-serif",
              },
              marker: { size: 8, color: "#f7653e" },
            },
            {
              type: "scatter",
              mode: "lines",
              name: `pC Corr`,
              x: xStockChartCloseValues.map(Number),
              y: lineYCord,
              line: { color: "#26bf4e" },
            },
          ]}
          layout={this.layout}
          config={{ displayModeBar: false }}
        />
      </div>
    );
  }

  layout = {
    width: 1100,
    height: 410,
    title: {
      text: `${this.props.assetX} & ${this.props.assetY} Correlation Plot`,
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
    // grid: {
    //   subplots: [["xy", "x2y"]],
    // },
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

export default CorrelationPlot;
