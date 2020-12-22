import React from "react";
import Plot from 'react-plotly.js';
import { Row, Col, Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../components/Widget/Widget";
import s from "./Notifications.module.scss";
import { rgbToHsl } from "@amcharts/amcharts4/.internal/core/utils/Colors";

class Visualization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock = () => {
    const apiKey = "OMF5LH7HQ3XLVQI8";
    let stockSymbol = "AMZN";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`;
  
    let apiStockXValues = [];
    let apiStockYValues = [];
  
    fetch(API_CALL)
    .then((response) => {
      return response.json();
    }).then((data) => {
      for (var key in data['Time Series (Daily)']) {
        apiStockXValues.push(key);
        apiStockYValues.push(data['Time Series (Daily)'][key]['1. open']);
      }
  
      this.setState({
        stockChartXValues: apiStockXValues,
        stockChartYValues: apiStockYValues
      });
    })
  }

  //Notification code here if need be

  render() {
    const {stockChartXValues, stockChartYValues} = this.state;
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Visualization
        </h1>

        <div>
          Stock Market
        </div>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
      />
      </div>
    );
  }
}

export default Visualization;
