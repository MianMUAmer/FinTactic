import React from "react";
import CandleStickPlot from "./CandleStickPlot";
import LineGraph from "./LineGraph";
import Plot from "react-plotly.js";
import {
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../components/Widget/Widget";
import s from "./Notifications.module.scss";
import { rgbToHsl } from "@amcharts/amcharts4/.internal/core/utils/Colors";
import BollingerBand from "./BollingerBand";
import RSI from "./RSI";
import RSI2Plots from "./RSI2Plots";

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        symbol: "",
        stockChartXValues: [],
        stockChartCloseValues: [],
        stockChartHighValues: [],
        stockChartLowValues: [],
        stockChartOpenValues: [],
      },
      refresh: false,

      assetType: "Stocks",
      ticker: "AMZN",
      graphType: "Candle Stick",
      fIndicatorType: "Indicators",
      finIndicator: "",
      rangeStart: "",
      rangeEnd: "",
      assetTypeDropdownOpen: false,
      gTypeDropdownOpen: false,
      finIndiDropDownOpen: false,
      tickerDropdownOpen: false,
      startRangeDropdownOpen: false,
      endRangeDropdownOpen: false,
    };
  }
  toggleAssetTypeDD = () =>
    this.setState({ assetTypeDropdownOpen: !this.state.assetTypeDropdownOpen });
  toggleGTypeDD = () =>
    this.setState({ gTypeDropdownOpen: !this.state.gTypeDropdownOpen });
  toggleFinIndiDD = () =>
    this.setState({ finIndiDropDownOpen: !this.state.finIndiDropDownOpen });
  toggleTickerDD = () =>
    this.setState({ tickerDropdownOpen: !this.state.tickerDropdownOpen });
  toggleRangeStartDD = () =>
    this.setState({
      startRangeDropdownOpen: !this.state.startRangeDropdownOpen,
    });
  toggleRangeEndDD = () =>
    this.setState({ endRangeDropdownOpen: !this.state.endRangeDropdownOpen });

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock = () => {
    let stockSymbol = this.state.ticker;
    let apiStockXValues = [];
    let apiStockCloseValues = [];
    let apiStockHighValues = [];
    let apiStockLowValues = [];
    let apiStockOpenValues = [];

    this.setState({
      refresh: false,
    });

    fetch("/assets", {
      method: "post",
      body: JSON.stringify({ name: stockSymbol }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          apiStockXValues.push(key);
          apiStockOpenValues.push(data["Time Series (Daily)"][key]["1. open"]);
          apiStockHighValues.push(data["Time Series (Daily)"][key]["2. high"]);
          apiStockLowValues.push(data["Time Series (Daily)"][key]["3. low"]);
          apiStockCloseValues.push(
            data["Time Series (Daily)"][key]["4. close"]
          );
        }

        this.setState((oldDataState) => ({
          ...oldDataState,
          data: {
            name: "Name",
            symbol: data["Meta Data"]["2. Symbol"],
            stockChartXValues: apiStockXValues,
            stockChartOpenValues: apiStockOpenValues,
            stockChartHighValues: apiStockHighValues,
            stockChartLowValues: apiStockLowValues,
            stockChartCloseValues: apiStockCloseValues,
          },
          refresh: true,
        }));
      });
  };

  //Notification code here if need be

  render() {
    const {
      data,
      graphType,
      fIndicatorType,
      ticker,
      assetType,
      refresh,
    } = this.state;
    const {
      assetTypeDropdownOpen,
      gTypeDropdownOpen,
      finIndiDropDownOpen,
      tickerDropdownOpen,
      endRangeDropdownOpen,
      startRangeDropdownOpen,
    } = this.state;

    return (
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 15,
          marginBottom: 10,
        }}
        className={s.root}
      >
        <h1 className="page-title">Visualization</h1>

        <h3>Market Analysis</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            marginBottom: 20,
            alignItems: "baseline",
          }}
        >
          <h5
            style={{
              marginTop: 15,
            }}
          >
            Filters :
          </h5>
          <Dropdown
            isOpen={assetTypeDropdownOpen}
            toggle={this.toggleAssetTypeDD}
          >
            <DropdownToggle caret color="dark">
              {assetType}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Asset Type</DropdownItem>
              <DropdownItem
                onClick={() => {
                  this.setState({ assetType: "Stocks", ticker: "AMZN" }, () => {
                    this.fetchStock();
                  });
                }}
              >
                Stocks
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  this.setState(
                    { assetType: "Currency", ticker: "BTC" },
                    () => {
                      this.fetchStock();
                    }
                  );
                }}
              >
                Currency
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  this.setState(
                    { assetType: "Commodity", ticker: "GC" },
                    () => {
                      this.fetchStock();
                    }
                  );
                }}
              >
                Commodity
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {assetType === "Stocks" && (
            <Dropdown isOpen={tickerDropdownOpen} toggle={this.toggleTickerDD}>
              <DropdownToggle caret color="dark">
                {ticker}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Ticker</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "AMZN" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Amazon
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "GOOGL" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Google
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "AAPL" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Apple
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "MSFT" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Microsoft
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "FB" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Facebook
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {assetType === "Currency" && (
            <Dropdown isOpen={tickerDropdownOpen} toggle={this.toggleTickerDD}>
              <DropdownToggle caret color="dark">
                {ticker}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Ticker</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "BTC" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  BitCoin
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "ETH" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Ethereum
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {assetType === "Commodity" && (
            <Dropdown isOpen={tickerDropdownOpen} toggle={this.toggleTickerDD}>
              <DropdownToggle caret color="dark">
                {ticker}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Ticker</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "GC" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Gold
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ ticker: "SI" }, () => {
                      this.fetchStock();
                    });
                  }}
                >
                  Silver
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          <Dropdown isOpen={gTypeDropdownOpen} toggle={this.toggleGTypeDD}>
            <DropdownToggle caret color="dark">
              {graphType}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Graph Type</DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ graphType: "Candle Stick" })}
              >
                Candle Stick
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ graphType: "Line Graph" })}
              >
                Line Graph
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={finIndiDropDownOpen} toggle={this.toggleFinIndiDD}>
            <DropdownToggle caret color="dark">
              {fIndicatorType}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Financial Indicators</DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ fIndicatorType: "Indicators" })}
              >
                None
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  this.setState({ fIndicatorType: "Bollinger Bands" })
                }
              >
                Bollinger Bands
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ fIndicatorType: "RSI" })}
              >
                Relative Strength Index
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown
            isOpen={startRangeDropdownOpen}
            toggle={this.toggleRangeStartDD}
          >
            <DropdownToggle caret color="dark">
              Range:Start
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Start Date</DropdownItem>
              <DropdownItem disabled>Calender</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown
            isOpen={endRangeDropdownOpen}
            toggle={this.toggleRangeEndDD}
          >
            <DropdownToggle caret color="dark">
              Range:End
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>End Date</DropdownItem>
              <DropdownItem disabled>Calender</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {graphType === "Candle Stick" &&
          data.stockChartXValues.length !== 0 &&
          refresh &&
          fIndicatorType === "Indicators" && <CandleStickPlot data={data} />}
        {graphType === "Line Graph" &&
          data.stockChartXValues.length !== 0 &&
          refresh && <LineGraph data={data} />}
        {/* Indicators */}
        {graphType === "Candle Stick" &&
          data.stockChartXValues.length !== 0 &&
          refresh &&
          fIndicatorType === "Bollinger Bands" && <BollingerBand data={data} />}
        {graphType === "Candle Stick" &&
          data.stockChartXValues.length !== 0 &&
          refresh &&
          fIndicatorType === "RSI" && <RSI2Plots data={data} />}
      </div>
    );
  }
}

export default Visualization;
