import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";
import Widget from "../../components/Widget";
import s from "./Static.module.scss";

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          picture: require("../../images/reportimg.png"),
          description: "Palo Alto",
          info: {
            type: "PDF",
          },
          date: new Date("September 14, 2012"),
        },
        {
          id: 2,
          picture: require("../../images/reportimg.png"),
          description: "The Sky",
          info: {
            type: "PDF",
          },
          date: new Date("November 14, 2012"),
        },
        {
          id: 3,
          picture: require("../../images/reportimg.png"),
          description: "Down the road",
          label: {
            colorClass: "primary",
          },
          info: {
            type: "PDF",
          },
          date: new Date("September 14, 2012"),
        },
        {
          id: 4,
          picture: require("../../images/reportimg.png"),
          description: "The Edge",
          info: {
            type: "PDF",
          },
          date: new Date("September 15, 2012"),
        },
        {
          id: 5,
          picture: require("../../images/reportimg.png"),
          description: "Fortress",
          info: {
            type: "PDF",
          },
          date: new Date("October 1, 2012"),
        },
      ],
    };
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title" style={{ color: "black" }}>
          Reports
        </h2>
        <Row>
          <Col>
            <Widget bodyClass={s.mainTableWidget}>
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th>Report</th>
                    <th>Description</th>
                    <th className="hidden-sm-down">Info</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <img
                          className="img-rounded"
                          src={row.picture}
                          alt=""
                          height="50"
                          width="50"
                        />
                      </td>
                      <td>
                        {row.description}
                        {row.label && (
                          <div>
                            <Badge color={row.label.colorClass}>
                              {row.label.text}
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td>
                        <p className="mb-0">
                          <small>
                            Type:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.info.type}
                            </span>
                          </small>
                        </p>
                      </td>
                      <td className="text-muted">{this.parseDate(row.date)}</td>
                      <td>
                        <span
                          className="glyphicon glyphicon-download-alt"
                          style={{ color: "red" }}
                        />
                      </td>
                      <td className="width-150">
                        <td>
                          <span
                            className="glyphicon glyphicon-trash"
                            style={{ color: "black" }}
                          />
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}></Col>
        </Row>
      </div>
    );
  }
}

export default Reports;
