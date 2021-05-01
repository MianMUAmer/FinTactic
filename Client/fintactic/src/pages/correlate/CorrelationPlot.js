import React from "react";
import Plot from "react-plotly.js";

class CorrelationPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xSymbol: this.props.dataX.symbol,
      xStockChartXValues: this.props.dataX.stockChartXValues,
      xStockChartCloseValues: this.props.dataX.stockChartCloseValues,

      ySymbol: this.props.dataY.symbol,
      yStockChartXValues: this.props.dataY.stockChartXValues,
      yStockChartCloseValues: this.props.dataY.stockChartCloseValues,
    };
    console.log(this.props.dataY);
  }

  render() {
    const {
      xStockChartCloseValues,
      xStockChartXValues,
      xSymbol,
      ySymbol,
      yStockChartXValues,
      yStockChartCloseValues,
    } = this.state;
    return (
      <div>
        <Plot
          data={[
            {
              x: xStockChartCloseValues,
              y: yStockChartCloseValues,
              mode: "markers",
              type: "scatter",
              name: { xSymbol },
              text: xStockChartXValues,
              textfont: {
                family: "Raleway, sans-serif",
              },
              marker: { size: 8, color: "#f7653e" },
            },
            // {
            //   x: yStockChartXValues,
            //   y: yStockChartCloseValues,
            //   mode: "markers",
            //   type: "scatter",
            //   name: { ySymbol },
            //   text: yStockChartXValues,
            //   textfont: {
            //     family: "Times New Roman",
            //   },
            //   marker: { size: 8 },
            // },
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
      text: `${this.props.dataX.name} & ${this.props.dataY.name} Correlation Plot`,
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
