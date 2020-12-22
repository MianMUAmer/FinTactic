import React from "react";
import CandleStickPlot from './CandleStickPlot'
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
      stockChartCloseValues: [],
      stockChartHighValues: [],
      stockChartLowValues: [],
      stockChartOpenValues: []
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
    let apiStockCloseValues = [];
    let apiStockHighValues = [];
    let apiStockLowValues = [];
    let apiStockOpenValues = [];
  
    fetch(API_CALL)
    .then((response) => {
      return response.json();
    }).then((data) => {
      for (var key in data['Time Series (Daily)']) {
        apiStockXValues.push(key);
        apiStockOpenValues.push(data['Time Series (Daily)'][key]['1. open']);
        apiStockHighValues.push(data['Time Series (Daily)'][key]['2. high']);
        apiStockLowValues.push(data['Time Series (Daily)'][key]['3. low']);
        apiStockCloseValues.push(data['Time Series (Daily)'][key]['4. close']);
      }
  
      this.setState({
        stockChartXValues: apiStockXValues,
        stockChartOpenValues: apiStockOpenValues,
        stockChartHighValues: apiStockHighValues,
        stockChartLowValues: apiStockLowValues,
        stockChartCloseValues: apiStockCloseValues
      });
    })
  }

  //Notification code here if need be

  render() {
    console.log("dsdsdsd")
    const {stockChartXValues, stockChartOpenValues, stockChartHighValues, stockChartLowValues, stockChartCloseValues} = this.state;
    const data = {stockChartXValues, stockChartOpenValues, stockChartHighValues, stockChartLowValues, stockChartCloseValues};
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Visualization
        </h1>

        <h3>
          Stock Market
        </h3>
        { stockChartXValues.length !== 0 && <CandleStickPlot data={data}/>}
      </div>
    );
  }
}

export default Visualization;
