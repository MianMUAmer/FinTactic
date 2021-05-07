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
import { isThisHour } from "date-fns";
import source from "../../images/reportimg.png";
import { loginUser } from '../../actions/user';
import moment, { isDate } from "moment";
import download from 'downloadjs';


class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file_date: '',
      row: '',
      id: '',
      myArray: [],
      report: '',
      title: '',
      
    }
    this.deleteRepFromDb = this.deleteRepFromDb.bind(this);
  }

  componentDidMount() {
    console.log(moment())
    var user_id = localStorage.getItem("user_id");
    fetch('/getMetaReport', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({id: user_id}),
    }).then(res => res.json()).catch(error => {
      console.error('Error:', error);
  })
  .then(response => {
      console.log(response);
      this.setState({myArray: response});
  })

  }

  

  deleteRepFromDb(row_id) {
    fetch('/deleteReports', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({id: row_id}),
    }).then(res => res.json()).catch(error => {
      console.error('Error:', error);
  })
  .then(response => {
      console.log(response);
  }) 

  this.setState(({ myArray }) => ({
    myArray: Object.values(this.state.myArray).filter(row => row.id !== row_id)
  }))
  }

  downloadReport(idx, date, index, title) {

    let url = `http://localhost:5000/getDataReport?id=${idx}`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({id: idx}),
      headers: {'responseType':'blob', 'Content-Type': 'application/json'},
      mode: "cors"
    }).then(function (resp) {
      return resp.blob();
    }).then(body => {
      download(body, title+'-'+index+'.pdf');
    });

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

            <Widget
              bodyClass={s.mainTableWidget}
              style={{backgroundColor: "#A7A0C3"}}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down"></th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Report</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Title</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Type</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Date</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Download</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px"}}>Delete</th>
                  </tr>
                </thead>
                <tbody style={{backgroundColor: "#A0A2DA"}}>
                  {Object.values(this.state.myArray).map((row, index) => (
                    
                    <tr key={row.id}>
                      <td style={{color: "#000000", fontWeight: "500"}}>{
                        index + 1
                        }
                        </td>
                      <td>
                        <img
                          className="img-rounded"
                          src={source}
                          alt=""
                          height="50"
                          width="50"
                        />
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.title}
                      </td>
                      <td>
                          <small>
                            <span style={{color: "#000000", fontWeight: "bold"}} >
                              &nbsp; {"PDF"}
                            </span>
                          </small>
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>{(moment(row.date, "DD/MM/YYYY").format("MMMM D, dddd, YY"))}</td>
                      <td><span className="glyphicon glyphicon-download-alt" style={{color: "#640303", left: "40px", marginTop: "16px", cursor: "pointer"}} onClick={() => { this.downloadReport(row.id, row.date, index+1, row.title) }}/></td>
                      <td className="width-150">
                      <td><span className="glyphicon glyphicon-trash" style={{color: "black", left: "14px", cursor: "pointer"}} onClick={() => {this.deleteRepFromDb(row.id)}}/></td>
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

