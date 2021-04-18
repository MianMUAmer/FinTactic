import React from "react";
// import CandleStickPlot from "./CandleStickPlot";
// import LineGraph from "./LineGraph";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import s from "./Notifications.module.scss";

class Correlate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataX: {
        name: "1",
        symbol: "",
        stockChartXValues: [],
        stockChartCloseValues: [],
        stockChartHighValues: [],
        stockChartLowValues: [],
        stockChartOpenValues: [],
      },
      dataY: {
        name: "2",
        symbol: "",
        stockChartXValues: [],
        stockChartCloseValues: [],
        stockChartHighValues: [],
        stockChartLowValues: [],
        stockChartOpenValues: [],
      },
      refresh: false,

      assetXType: "Stocks",
      tickerX: "AMZN",
      graphXType: "Candle Stick",
      assetXTypeDropdownOpen: false,
      gXTypeDropdownOpen: false,
      tickerXDropdownOpen: false,

      assetYType: "Stocks",
      tickerY: "AMZN",
      graphYType: "Candle Stick",
      assetYTypeDropdownOpen: false,
      gYTypeDropdownOpen: false,
      tickerYDropdownOpen: false,

      startRangeDropdownOpen: false,
      endRangeDropdownOpen: false,
      startRange: "All",
      endRange: "",
      apiSDate: "",
      apiEDate: "",
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
    };
  }
  toggleAssetXTypeDD = () =>
    this.setState({
      assetXTypeDropdownOpen: !this.state.assetXTypeDropdownOpen,
    });
  toggleAssetYTypeDD = () =>
    this.setState({
      assetYTypeDropdownOpen: !this.state.assetYTypeDropdownOpen,
    });

  toggleGXTypeDD = () =>
    this.setState({ gXTypeDropdownOpen: !this.state.gXTypeDropdownOpen });
  toggleGYTypeDD = () =>
    this.setState({ gYTypeDropdownOpen: !this.state.gYTypeDropdownOpen });

  toggleTickerXDD = () =>
    this.setState({ tickerXDropdownOpen: !this.state.tickerXDropdownOpen });
  toggleTickerYDD = () =>
    this.setState({ tickerYDropdownOpen: !this.state.tickerYDropdownOpen });

  toggleRangeStartDD = () =>
    this.setState({
      startRangeDropdownOpen: !this.state.startRangeDropdownOpen,
    });

  componentDidMount() {
    // this.fetchStock();
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
            name: data["Meta Data"]["2. Symbol"],
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

  fetchRangeStock = (apiSDate, apiEDate) => {
    let stockSymbolX = this.state.tickerX;
    let stockSymbolY = this.state.tickerY;
    let XapiStockXValues = [];
    let XapiStockCloseValues = [];
    let YapiStockXValues = [];
    let YapiStockCloseValues = [];

    this.setState({
      refresh: false,
    });

    // Fetch assetX
    fetch("/assets", {
      method: "post",
      body: JSON.stringify({
        name: stockSymbolX,
        startDate: apiSDate,
        endDate: apiEDate,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          XapiStockXValues.push(key);
          XapiStockCloseValues.push(
            data["Time Series (Daily)"][key]["4. close"]
          );
        }

        this.setState(
          (oldDataState) => ({
            ...oldDataState,
            dataX: {
              name: data["Meta Data"]["2. Symbol"],
              symbol: data["Meta Data"]["2. Symbol"],
              stockChartXValues: XapiStockXValues,
              stockChartCloseValues: XapiStockCloseValues,
            },
            refresh: true,
          }),
          () => console.log(this.state.dataX)
        );
      });

    // Fetch assetY
    fetch("/assets", {
      method: "post",
      body: JSON.stringify({
        name: stockSymbolY,
        startDate: apiSDate,
        endDate: apiEDate,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          YapiStockXValues.push(key);
          YapiStockCloseValues.push(
            data["Time Series (Daily)"][key]["4. close"]
          );
        }

        this.setState(
          (oldDataState) => ({
            ...oldDataState,
            dataY: {
              name: data["Meta Data"]["1. Symbol"],
              symbol: data["Meta Data"]["2. Symbol"],
              stockChartXValues: YapiStockXValues,
              stockChartCloseValues: YapiStockCloseValues,
            },
            refresh: true,
          }),
          () => console.log(this.state.dataY)
        );
      });
  };

  handleDateRangeSelect = (items) => {
    this.setState(
      {
        selectionRange: {
          startDate: items.range1.startDate
            ? items.range1.startDate
            : this.state.startDate,
          endDate: items.range1.endDate
            ? items.range1.endDate
            : this.state.endDate,
        },
        startRange: items.range1.startDate
          ? items.range1.startDate.toString().slice(4, 15)
          : this.state.startRange,
        endRange: items.range1.endDate
          ? items.range1.endDate.toString().slice(4, 15)
          : this.state.endRange,
      },
      () => {
        var SdateString = JSON.stringify(this.state.startRange);
        var EdateString = JSON.stringify(this.state.endRange);
        this.setState(
          {
            apiSDate: JSON.stringify(moment(SdateString).format("YYYY-MM-DD")),
            apiEDate: JSON.stringify(moment(EdateString).format("YYYY-MM-DD")),
          },
          () => {
            console.log(this.state.apiSDate, this.state.apiEDate);
          }
        );
      }
    );
  };

  applyFilters = () => {
    const {
      apiSDate,
      apiEDate,
      assetXType,
      assetYType,
      tickerX,
      tickerY,
      graphXType,
      graphYType,
    } = this.state;
    console.log(
      assetXType,
      tickerX,
      graphXType,
      assetYType,
      tickerY,
      graphYType,
      apiSDate,
      apiEDate
    );
    // this.fetchRangeStock(apiSDate, apiEDate);
  };

  resetFilter = () => {
    this.setState(
      {
        startRange: "All",
        endRange: "",
        selectionRange: {
          startDate: new Date(),
          endDate: new Date(),
        },
      },
      () => {
        //this.fetchStock();
      }
    );
  };

  render() {
    const {
      dataX,
      dataY,
      graphXType,
      graphYType,
      tickerX,
      tickerY,
      assetXType,
      assetYType,
      refresh,
      startRange,
      endRange,
    } = this.state;
    const {
      assetXTypeDropdownOpen,
      gXTypeDropdownOpen,
      tickerXDropdownOpen,
      assetYTypeDropdownOpen,
      gYTypeDropdownOpen,
      tickerYDropdownOpen,
      startRangeDropdownOpen,
    } = this.state;

    return (
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        className={s.root}
      >
        <h1 className="page-title" style={{ color: "black" }}>
          Correlate
        </h1>

        {/* ======================================= Asset X ======================================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "baseline",
          }}
        >
          <h4
            style={{
              width: "10%",
              color: "black",
            }}
          >
            AssetX :
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "65%",
              alignItems: "baseline",
            }}
          >
            <Dropdown
              isOpen={assetXTypeDropdownOpen}
              toggle={this.toggleAssetXTypeDD}
            >
              <DropdownToggle caret color="dark">
                {assetXType}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Asset Type</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetXType: "Stocks", tickerX: "AMZN" });
                  }}
                >
                  Stocks
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetXType: "Currency", tickerX: "BTC" });
                  }}
                >
                  Currency
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetXType: "Commodity", tickerX: "GC" });
                  }}
                >
                  Commodity
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {assetXType === "Stocks" && (
              <Dropdown
                isOpen={tickerXDropdownOpen}
                toggle={this.toggleTickerXDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerX}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "AMZN" });
                    }}
                  >
                    Amazon
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "GOOGL" });
                    }}
                  >
                    Google
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "AAPL" });
                    }}
                  >
                    Apple
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "MSFT" });
                    }}
                  >
                    Microsoft
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "FB" });
                    }}
                  >
                    Facebook
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            {assetXType === "Currency" && (
              <Dropdown
                isOpen={tickerXDropdownOpen}
                toggle={this.toggleTickerXDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerX}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "BTC" });
                    }}
                  >
                    BitCoin
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "ETH" });
                    }}
                  >
                    Ethereum
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            {assetXType === "Commodity" && (
              <Dropdown
                isOpen={tickerXDropdownOpen}
                toggle={this.toggleTickerXDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerX}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "GC" });
                    }}
                  >
                    Gold
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerX: "SI" });
                    }}
                  >
                    Silver
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            <Dropdown isOpen={gXTypeDropdownOpen} toggle={this.toggleGXTypeDD}>
              <DropdownToggle caret color="dark">
                {graphXType}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Graph Type</DropdownItem>
                <DropdownItem
                  onClick={() => this.setState({ graphXType: "Candle Stick" })}
                >
                  Candle Stick
                </DropdownItem>
                <DropdownItem
                  onClick={() => this.setState({ graphXType: "Line Graph" })}
                >
                  Line Graph
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* ======================================= Asset Y DropDown ======================================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "70%",
              marginBottom: 20,
              alignItems: "baseline",
            }}
          >
            <h4
              style={{
                marginTop: 15,
                color: "black",
              }}
            >
              AssetY :
            </h4>
            <Dropdown
              isOpen={assetYTypeDropdownOpen}
              toggle={this.toggleAssetYTypeDD}
            >
              <DropdownToggle caret color="dark">
                {assetYType}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Asset Type</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetYType: "Stocks", tickerY: "AMZN" });
                  }}
                >
                  Stocks
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetYType: "Currency", tickerY: "BTC" });
                  }}
                >
                  Currency
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ assetYType: "Commodity", tickerY: "GC" });
                  }}
                >
                  Commodity
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {assetYType === "Stocks" && (
              <Dropdown
                isOpen={tickerYDropdownOpen}
                toggle={this.toggleTickerYDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerY}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "AMZN" });
                    }}
                  >
                    Amazon
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "GOOGL" });
                    }}
                  >
                    Google
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "AAPL" });
                    }}
                  >
                    Apple
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "MSFT" });
                    }}
                  >
                    Microsoft
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "FB" });
                    }}
                  >
                    Facebook
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            {assetYType === "Currency" && (
              <Dropdown
                isOpen={tickerYDropdownOpen}
                toggle={this.toggleTickerYDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerY}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "BTC" });
                    }}
                  >
                    BitCoin
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "ETH" });
                    }}
                  >
                    Ethereum
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            {assetYType === "Commodity" && (
              <Dropdown
                isOpen={tickerYDropdownOpen}
                toggle={this.toggleTickerYDD}
              >
                <DropdownToggle caret color="dark">
                  {tickerY}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Ticker</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "GC" });
                    }}
                  >
                    Gold
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.setState({ tickerY: "SI" });
                    }}
                  >
                    Silver
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

            <Dropdown isOpen={gYTypeDropdownOpen} toggle={this.toggleGYTypeDD}>
              <DropdownToggle caret color="dark">
                {graphYType}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Graph Type</DropdownItem>
                <DropdownItem
                  onClick={() => this.setState({ graphYType: "Candle Stick" })}
                >
                  Candle Stick
                </DropdownItem>
                <DropdownItem
                  onClick={() => this.setState({ graphYType: "Line Graph" })}
                >
                  Line Graph
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* ======================================= Data Range ======================================= */}
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            width: "70%",
            marginBottom: 20,
            alignItems: "baseline",
          }}
        >
          <h4
            style={{
              marginRight: 12,
              color: "black",
            }}
          >
            Data Range :
          </h4>
          <div>
            <Dropdown
              isOpen={startRangeDropdownOpen}
              toggle={this.toggleRangeStartDD}
              style={{
                marginRight: 15,
              }}
            >
              <DropdownToggle caret color="dark">
                {endRange === ""
                  ? `Data Range:  ${startRange}`
                  : `Data Range:  ${startRange} - ${endRange}`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Date Range</DropdownItem>
                <DateRangePicker
                  ranges={[this.state.selectionRange]}
                  onChange={(range) => this.handleDateRangeSelect(range)}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  direction="horizontal"
                />
              </DropdownMenu>
            </Dropdown>
          </div>
          <div style={{ display: "flex", width: "30%" }}>
            <Button
              color="success"
              style={{ marginRight: 15, width: "50%" }}
              onClick={() => this.applyFilters()}
            >
              Apply
            </Button>
            <Button
              color="danger"
              style={{ marginRight: 15, width: "50%" }}
              onClick={() => this.resetFilter()}
            >
              Reset
            </Button>
          </div>
        </div>

        <div
          style={{
            color: "black",
            display: "flex",
            height: 340,
            marginBottom: 25,
          }}
        >
          <div style={{ border: "1px solid red", width: "50%" }}>
            <h5 style={{ color: "black" }}>AssetX: {dataX.name}</h5>
            <div style={{ border: "1px solid yellow", height: "92%" }}></div>
          </div>
          <div style={{ border: "1px solid blue", width: "50%" }}>
            <h5 style={{ color: "black" }}>AssetY: {dataY.name}</h5>
            <div style={{ border: "1px solid purple", height: "92%" }}></div>
          </div>
        </div>
        <h5 style={{ color: "black" }}>Correlation:</h5>
        <div
          style={{
            color: "black",
            display: "flex",
            height: 360,
            border: "1px solid green",
          }}
        ></div>
      </div>
    );
  }
}

export default Correlate;
