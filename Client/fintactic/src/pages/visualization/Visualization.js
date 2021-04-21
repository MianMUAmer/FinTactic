import React from "react";
import CandleStickPlot from "./CandleStickPlot";
import LineGraph from "./LineGraph";
import { getFibRetracement, levels } from "fib-retracement";
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
import BollingerBand from "./BollingerBand";
import RSI from "./RSI";
import FibonacciRetracements from "./FibonacciRetracements";
import MACD from "./MACD";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      notes: "",
      dataURL: "",
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
      assetTypeDropdownOpen: false,
      gTypeDropdownOpen: false,
      finIndiDropDownOpen: false,
      tickerDropdownOpen: false,
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
    this.handleChange = this.handleChange.bind(this);
    this.screenshot = this.screenshot.bind(this);
   // this.postAttachment = this.postAttachment.bind(this);
  }

  screenshot() {
    window.scrollTo(0, 0);
    console.log(this.state.title + "" + this.state.notes);
    var x = this.state.title;
    var y = this.state.notes;
    console.log(x, y);
    html2canvas(document.getElementById("capture")).then(function (canvas) {
      window.scrollTo(0, 0);
      //document.body.appendChild(canvas);
      let dataURL = canvas.toDataURL("image/png");
      console.log(dataURL);
      var doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [20, 20],
      });
      window.scrollTo(0, 0);
      doc.addImage(dataURL, "PNG", 0.3, 0.3);
      doc.setTextColor(255, 0, 0);
      doc.text(x, 0.3, 10);
      doc.setTextColor(0, 0, 0);
      doc.text(y, 0.3, 10.3);
      doc.save("sample-file.pdf");
      console.log(doc)
      
    });

    let formData = new FormData()
    var a = this.state.title;
    var report = this.state.doc;
    console.log(report)
    formData.append('report', report)
    formData.append('id', '2')
    formData.append('title', a)
    return fetch('/upReport', {
      headers: {
        'Accept': 'application/json',
        'header1': 'headerValue1'
      },
      method: 'POST',
      body: formData
    }).then(res => console.log(res))
  }


  /*postAttachment (e) {
    e.preventDefault();
    let formData = new FormData()
    var a = this.state.title;
    var report = this.state.doc;
    console.log(report)
    formData.append('report', report)
    formData.append('id', '2')
    formData.append('title', a)
    return fetch('/upReport', {
      headers: {
        'Accept': 'application/json',
        'header1': 'headerValue1'
      },
      method: 'POST',
      body: formData
    }).then(res => console.log(res))
  }*/

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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

  componentDidMount() {
    this.fetchStock();
    if (this.multilineTextarea) {
      this.multilineTextarea.style.height = "auto";
      this.multilineTextarea.style.backgroundColor = "#F5F5AE";
      this.multilineTextarea.style.width = "500px";
    }

    let formData = new FormData()
    var a = this.state.title;
    var report = this.state.doc;
    console.log(report)
    formData.append('report', report)
    formData.append('id', '2')
    formData.append('title', a)
    return fetch('/upReport', {
      headers: {
        'Accept': 'application/json',
        'header1': 'headerValue1'
      },
      method: 'POST',
      body: formData
    }).then(res => console.log(res))

  }

  changeTextarea = () => {
    this.multilineTextarea.style.height = "auto";
    this.multilineTextarea.style.color = "black";
    this.multilineTextarea.style.height =
      this.multilineTextarea.scrollHeight + "px";
  };
  

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
            name: data["Meta Data"]["3. Name"],
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
      body: JSON.stringify({
        name: stockSymbol,
        startDate: apiSDate,
        endDate: apiEDate,
      }),
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
            name: data["Meta Data"]["3. Name"],
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
        var edateString = JSON.stringify(this.state.endRange);
        this.setState(
          {
            apiSDate: JSON.stringify(moment(SdateString).format("YYYY-MM-DD")),
            apiEDate: JSON.stringify(moment(edateString).format("YYYY-MM-DD")),
          },
          () => {
            console.log(this.state.apiSDate, this.state.apiEDate);
          }
        );
      }
    );
  };

  applyFilters = () => {
    const { apiSDate, apiEDate } = this.state;
    this.fetchRangeStock(apiSDate, apiEDate);
  };

  resetFilter = () => {
    this.setState(
      {
        fIndicatorType: "Indicators",
        startRange: "All",
        endRange: "",
        selectionRange: {
          startDate: new Date(),
          endDate: new Date(),
        },
      },
      () => {
        this.fetchStock();
      }
    );
  };

  render() {
    const {
      data,
      graphType,
      fIndicatorType,
      ticker,
      assetType,
      refresh,
      startRange,
      endRange,
    } = this.state;
    const {
      assetTypeDropdownOpen,
      gTypeDropdownOpen,
      finIndiDropDownOpen,
      tickerDropdownOpen,
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
        <div id={`capture`}>
          <h1 className="page-title" style={{ color: "black" }}>
            Visualization - Market Analysis
          </h1>

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
                color: "black",
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
                    this.setState(
                      { assetType: "Stocks", ticker: "AMZN" },
                      () => {
                        this.fetchStock();
                      }
                    );
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
              <Dropdown
                isOpen={tickerDropdownOpen}
                toggle={this.toggleTickerDD}
              >
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
              <Dropdown
                isOpen={tickerDropdownOpen}
                toggle={this.toggleTickerDD}
              >
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
              <Dropdown
                isOpen={tickerDropdownOpen}
                toggle={this.toggleTickerDD}
              >
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

            <Dropdown
              isOpen={finIndiDropDownOpen}
              toggle={this.toggleFinIndiDD}
            >
              <DropdownToggle caret color="dark">
                {fIndicatorType}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Financial Indicators</DropdownItem>
                <DropdownItem
                  onClick={() =>
                    this.setState({ fIndicatorType: "Indicators" })
                  }
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
                <DropdownItem
                  onClick={() => this.setState({ fIndicatorType: "MACD" })}
                >
                  Moving Average Convergence Divergence
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    this.setState({ fIndicatorType: "Fib Retrace" })
                  }
                >
                  Fibonacci Retracements
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              width: "70%",
              marginBottom: 20,
              alignItems: "baseline",
            }}
          >
            <h5
              style={{
                marginRight: 12,
                color: "black",
              }}
            >
              Data Range :
            </h5>
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
              <Button onClick={this.screenshot} color="danger">
                Capture
              </Button>
            </div>
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
            fIndicatorType === "Bollinger Bands" && (
              <BollingerBand data={data} />
            )}
          {graphType === "Candle Stick" &&
            data.stockChartXValues.length !== 0 &&
            refresh &&
            fIndicatorType === "RSI" && <RSI data={data} />}
          {graphType === "Candle Stick" &&
            data.stockChartXValues.length !== 0 &&
            refresh &&
            fIndicatorType === "MACD" && <MACD data={data} />}
          {graphType === "Candle Stick" &&
            data.stockChartXValues.length !== 0 &&
            refresh &&
            fIndicatorType === "Fib Retrace" && (
              <FibonacciRetracements
                data={data}
                fibData={getFibRetracement({
                  levels: {
                    0: Math.min.apply(
                      null,
                      this.state.data.stockChartLowValues.map(Number)
                    ),
                    1: Math.max.apply(
                      null,
                      this.state.data.stockChartHighValues.map(Number)
                    ),
                  },
                })}
              />
            )}
        </div>
        <form>
          <h3 style={{ color: "black" }}>
            Take your notes, click on Capture and save them on Reports tab!
          </h3>
          <h4 style={{ color: "black" }}>Title: </h4>
          <textarea
            style={{
              color: "black",
              backgroundColor: "#F5F5AE",
              width: "400px",
              height: "25px",
            }}
            name="title"
            onChange={this.handleChange}
          ></textarea>
          <h4 style={{ color: "black" }}>Notes: </h4>
          <textarea
            onChange={this.changeTextarea}
            ref={(ref) => (this.multilineTextarea = ref)}
            style={{
              backgroundColor: "#F5F5AE",
              width: "600px",
              color: "black",
            }}
            name="notes"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Visualization;
