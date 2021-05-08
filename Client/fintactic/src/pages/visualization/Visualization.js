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
import { RotateCircleLoading } from "react-loadingg";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";
import MlPrediction from "./MlPrediction";

class Visualization extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      report: null,
      id: null,
      file: "",
      loading: "true",
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

      mlData: {
        name: "",
        symbol: "",
        stockChartXValues: [],
        stockChartCloseValues: [],
        stockPredictedValues: [],
      },
      isMLModalOpen: false,
      rSelected: null,

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
    // this.handleChange = this.handleChange.bind(this);
    this.screenshot = this.screenshot.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  saveState() {
    var a = this.state.assetType;
    localStorage.setItem("asset", a);
    var t = this.state.ticker;
    localStorage.setItem("ticker", t);
    var g = this.state.graphType;
    localStorage.setItem("graphType", g);
    var i = this.state.fIndicatorType;
    localStorage.setItem("indicator", i);
    var s = this.state.apiSDate;
    localStorage.setItem("startDate", s);
    var e = this.state.apiEDate;
    localStorage.setItem("endDate", e);

    var user_id = localStorage.getItem("user_id");

    if (this.state.fIndicatorType == "Indicators") {
      i = "None";
    }

    if (this.state.apiSDate == "" && this.state.apiEDate == "") {
      s = "None";
      e = "None";
    }

    fetch("/upNotes", {
      method: "post",
      body: JSON.stringify({
        id: user_id,
        asset: a,
        ticker: t,
        graph: g,
        indicator: i,
        startDate: s,
        endDate: e,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    toast.success("The state is saved successfully!");
  }

  screenshot() {
    console.log(this.state.notes, this.state.title, "232");

    window.scrollTo(0, 0);
    //console.log(this.state.title + "" + this.state.notes);
    var x = this.state.title;
    var y = this.state.notes;
    console.log(x, y);
    html2canvas(document.getElementById("capture")).then(function (canvas) {
      window.scrollTo(0, 0);
      //document.body.appendChild(canvas);
      let dataURL = canvas.toDataURL("image/png");
      //console.log(dataURL);
      var doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [18, 18],
      });
      window.scrollTo(0, 0);
      doc.addImage(dataURL, "PNG", 0.3, 0.3);
      doc.setTextColor(255, 0, 0);
      doc.text(x, 0.3, 8);
      doc.setTextColor(0, 0, 0);
      doc.text(y, 0.3, 8.3);
      //doc.save("beyza.pdf");
      //let file = doc;
      var pdf = doc.output("blob");

      var user_id = localStorage.getItem("user_id");
      var formData = new FormData();
      formData.append("report", pdf);
      formData.append("id", user_id);
      formData.append("title", x);

      fetch("/upReport", {
        method: "post",
        body: formData,
        //headers: {'Content-Type':'multipart/form-data'},
      })
        .then((resp) => resp.json())
        // .then((data) => console.log(data))
        .catch((err) => console.error(err));
    });
    this.setState({
      title: "",
      notes: "",
    });
    toast.success("The captured report is saved successfully!");

  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleNotesChange = (e) => {
    this.setState({
      notes: e.target.value,
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
    this._isMounted = true;
    if (this.multilineTextarea) {
      this.multilineTextarea.style.height = "auto";
      this.multilineTextarea.style.backgroundColor = "#Fs5F5AE";
      this.multilineTextarea.style.width = "500px";
    }

    if (this.props.location.state) {
      this.setState(
        {
          fIndicatorType: this.props.location.state.indicator,
          graphType: this.props.location.state.graph,
          assetType: this.props.location.state.asset,
          ticker: this.props.location.state.ticker,
          startRange:
            this.props.location.state.startd == "Invalid date"
              ? "All"
              : this.props.location.state.startd,
          endRange:
            this.props.location.state.end == "Invalid date"
              ? ""
              : this.props.location.state.end,
          apiSDate: JSON.stringify(
            moment(this.props.location.state.startd).format("YYYY-MM-DD")
          ),
          apiEDate: JSON.stringify(
            moment(this.props.location.state.end).format("YYYY-MM-DD")
          ),
        },
        () => {
          if (
            this.state.apiSDate == JSON.stringify("Invalid date") &&
            this.state.apiEDate == JSON.stringify("Invalid date")
          ) {
            this.fetchStock();
          } else {
            this.applyFilters();
          }
        }
      );
    } else {
      this.fetchStock();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        this.state.loading = "false";
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
        this.state.loading = "false";
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
        graphType: "Candle Stick",
      },
      () => {
        this.fetchStock();
      }
    );
  };

  openMLModal = () => {
    this.setState({
      isMLModalOpen: !this.state.isMLModalOpen,
    });
  };

  handleRadioChange = (e) => {
    e.persist();
    this.setState({
      rSelected: e.target.value,
    });
  };

  CloseML = () => {
    this.setState({
      rSelected: null,
      isMLModalOpen: false,
    });
  };

  MLPredGraph = () => {
    let apiStockXValues = [];
    let apiStockCloseValues = [];
    let apiStockPredValues = [];

    fetch("/mlOld", {
      method: "post",
      body: JSON.stringify({
        name: this.state.ticker,
        startDate: this.state.apiSDate,
        endDate: this.state.apiEDate,
        choice: this.state.rSelected,
      }),
    })
      .then((response) => {
        console.log(response);
        this.state.loading = "false";
        return response.json();
      })
      .then((data) => {
        if (this.state.rSelected === "Future Data") {
          console.log(data, "in Future");
          for (var key in data["data"]) {
            apiStockCloseValues.push(data["data"][key]);
          }
          for (var key in data["dates"]) {
            apiStockXValues.push(data["dates"][key]);
          }
          for (var key in data["future"]) {
            apiStockPredValues.push(data["future"][key]);
          }

          this.setState((oldDataState) => ({
            ...oldDataState,
            mlData: {
              name: data["meta"]["Name"],
              symbol: data["meta"]["Symbol"],
              stockChartXValues: apiStockXValues,
              stockChartCloseValues: apiStockCloseValues.map(Number),
              stockPredictedValues: apiStockPredValues.map(Number),
            },
            isMLModalOpen: false,
            graphType: "MlGraph",
            refresh: true,
          }));
        } else if (this.state.rSelected === "Old Data") {
          for (var key in data["data"]) {
            apiStockXValues.push(key);
            apiStockCloseValues.push(data["data"][key]["close"]);
            apiStockPredValues.push(data["data"][key]["predict"]);
          }
          console.log(apiStockPredValues, "§§§§");
          this.setState((oldDataState) => ({
            ...oldDataState,
            mlData: {
              name: data["meta"]["Name"],
              symbol: data["meta"]["Symbol"],
              stockChartXValues: apiStockXValues,
              stockChartCloseValues: apiStockCloseValues.map(Number),
              stockPredictedValues: apiStockPredValues,
            },
            isMLModalOpen: false,
            graphType: "MlGraph",
            refresh: true,
          }));
        }
        console.log(this.state.stockPredictedValues, "§§§§");
      });
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

    return this.state.loading == "true" ? (
      <RotateCircleLoading />
    ) : (
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
              <DropdownItem
                onClick={() => this.setState({ fIndicatorType: "MACD" })}
              >
                Moving Average Convergence Divergence
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ fIndicatorType: "Fib Retrace" })}
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
          <div style={{ display: "flex", width: "50%" }}>
            <Button
              color="success"
              style={{ marginRight: 15, width: "30%" }}
              onClick={() => this.applyFilters()}
            >
              Apply
            </Button>
            <Button
              color="danger"
              style={{ marginRight: 15, width: "30%" }}
              onClick={() => this.resetFilter()}
            >
              Reset
            </Button>
            <Button
              color="success"
              style={{ marginRight: 15, width: "40%" }}
              onClick={() => this.openMLModal()}
            >
              ML Prediction
            </Button>
          </div>
        </div>

        <Modal
          className="prof"
          isOpen={this.state.isMLModalOpen}
          toggle={this.openMLModal}
        >
          <ModalHeader className="prof" toggle={this.CloseML}>
            <h4>Forecast - {this.state.ticker}</h4>
          </ModalHeader>
          <ModalBody className="prof">
            <h5 style={{ marginBottom: "11px" }}>Predict: </h5>
            <Form.Group controlId="rSelected">
              <Form.Check
                value="Future Data"
                type="radio"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "8px",
                }}
                aria-label="radio 1"
                label="Future Data"
                onChange={this.handleRadioChange}
                checked={this.state.rSelected === "Future Data"}
              />
              <hr />
              <div style={{ marginTop: "8px" }}>
                <Form.Check
                  value="Old Data"
                  type="radio"
                  style={{ fontSize: "1.2rem" }}
                  aria-label="radio 2"
                  label="Old Data"
                  onChange={this.handleRadioChange}
                  checked={this.state.rSelected === "Old Data"}
                />
                <p
                  style={{
                    marginTop: "8px",
                    color:
                      this.state.rSelected === "Old Data" ? "black" : "#a6a6a6",
                  }}
                >
                  {endRange === ""
                    ? `Data Range:  ${startRange}`
                    : `Data Range:  ${startRange} - ${endRange}`}
                </p>
              </div>
            </Form.Group>
          </ModalBody>

          <ModalFooter className="prof">
            <Button
              style={{ width: "15%" }}
              color="danger"
              onClick={this.CloseML}
            >
              Cancel
            </Button>{" "}
            <Button
              style={{ width: "25%" }}
              color="success"
              type="submit"
              onClick={this.MLPredGraph}
            >
              Predict!
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <div id={`capture`}>
          {graphType === "Candle Stick" &&
            data.stockChartXValues.length !== 0 &&
            refresh &&
            fIndicatorType === "Indicators" && <CandleStickPlot data={data} />}
          {graphType === "Line Graph" &&
            data.stockChartXValues.length !== 0 &&
            refresh && <LineGraph data={data} />}
          {graphType === "MlGraph" &&
            data.stockChartXValues.length !== 0 &&
            refresh &&
            fIndicatorType === "Indicators" && (
              <MlPrediction
                data={this.state.mlData}
                predType={this.state.rSelected}
              />
            )}

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

        <div style={{ border: '2px dashed black', width:"1030px", borderRadius: "15px"}}>
          <form>
            <h4 style={{ color: "black", marginTop: "40px", marginBottom: "40px", marginLeft: "10px", marginRight: "10px"  }}>
              Take your notes, click on <b>Save Report</b> and save your capture
              on Reports tab!<br></br>
              Click on <b>Save States</b> and you will be able to turn back where
              you left on States tab!
            </h4>
            <h4 style={{ color: "black",  marginLeft: "10px", fontWeight: "500" }}>Title: </h4>
            <textarea
              style={{
                color: "black",
                backgroundColor: "#C5C3C7",
                width: "1010px",
                height: "35px",
                margin: "10px"
              }}
              name="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            ></textarea>
            <h4 style={{ color: "black",  marginLeft: "10px", fontWeight: "500" }}>Notes: </h4>
            <textarea
              onChange={this.changeTextarea}
              ref={(ref) => (this.multilineTextarea = ref)}
              style={{
                backgroundColor: "#C5C3C7",
                width: "1010px",
                height: "100px",
                color: "black",
                margin: "10px"
              }}
              name="notes"
              value={this.state.notes}
              onChange={this.handleNotesChange}
            />
          </form>
          <Button
            onClick={this.screenshot}
            style={{ backgroundColor: "#2471A3", margin: "15px"}}
          >
            Save Report
          </Button>
          <Button
            onClick={this.saveState}
            style={{ backgroundColor: "#7D3C98", margin: "15px"}}
          >
            Save State
          </Button>
        </div>
      </div>
    );
  }
}

export default Visualization;
