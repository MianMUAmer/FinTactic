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
import moment from "moment";


class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: "",
      ticker: "",
      graph: "",
      indicator: "",
      startDate: "",
      endDate: "",
      date: "",
      myNotesArray: [],
      
  }
  this.backToWork = this.backToWork.bind(this);
  this.deleteFromDb = this.deleteFromDb.bind(this);
}

  componentDidMount() {
    var user_id = localStorage.getItem("user_id");
    fetch('/getNotes', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({id: user_id}),
    }).then(res => res.json()).catch(error => {
      console.error('Error:', error);
  })
  .then(response => {
      console.log(response);
      //this.state.myArray.push(response);
      this.setState({myNotesArray: response});
      
  }) 
  
  }


  backToWork = (as, tk, gr, ind, sd, end) => {
    var ind_new = ""
    if(ind == "None"){
      ind_new = "Indicators"
    }else{
      ind_new = ind
    }

    this.props.history.push({
      pathname: '/app/visualization',
      state: { asset: as, ticker: tk, graph: gr, indicator: ind_new, startd: moment(sd).format("MMMM D YYYY"), end: moment(end).format("MMMM D YYYY")}
    })
    

  }

  deleteFromDb(row_id) {
    fetch('/deleteNotes', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({id: row_id}),
    }).then(res => res.json()).catch(error => {
      console.error('Error:', error);
  })
  .then(response => {
      console.log(response);
  }) 

  this.setState(({ myNotesArray }) => ({
    myNotesArray: Object.values(this.state.myNotesArray).filter(row => row.id !== row_id)
  }))
  
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

  renderTableData() {
    return this.state.myArray.map((student, index) => {
       const { id, date, title } = student //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{date}</td>
             <td>{title}</td>
          </tr>
       )
    })
 }
  

  render() {
    var i = 1;
    
    return (
      
      <div className={s.root}>
        <h2 className="page-title" style={{color: "black"}}>
          States
        </h2>
        <div style={{color: "black", fontSize: "17px"}}>Click on <span className="glyphicon glyphicon-step-backward" style={{color: "#2D005A", marginBottom: "3px"}}/> to go back to your work!</div>
        
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
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Asset Type</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Ticker</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Graph Type</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Indicator</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Date Range</th>
                    <th style={{color: "#342F3C", fontFamily: "'Trebuchet MS', sans-serif"}}>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{backgroundColor: "#A0A2DA"}}>

                  {Object.values(this.state.myNotesArray).map((row, index)  => (
                    <tr key={row.id}>
                      <td style={{color: "#000000", fontWeight: "500"}}>{index + 1}</td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.asset}
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.ticker}
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.graph}
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.indicator}
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>
                        {row.startDate == "None" && row.endDate == "None" ? "None" : moment(row.startDate).format("MMMM D, dddd, YY") +" - "+ moment(row.endDate).format("MMMM D, dddd, YY")}
                      </td>
                      <td style={{color: "#000000", fontWeight: "500"}}>{row.date}</td>
                      <td><span className="glyphicon glyphicon-step-backward" style={{color: "#2D005A", left: "80px", marginTop: "16px", cursor: "pointer"}}  onClick={() => {this.backToWork(row.asset, row.ticker, row.graph, row.indicator, row.startDate, row.endDate)}}/></td>
                      <td className="width-150">
                      <td><span className="glyphicon glyphicon-trash" style={{color: "black", left: "70px", cursor: "pointer"}} onClick={() => {this.deleteFromDb(row.id)}}/></td>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </Table>
              
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            
          </Col>
          <Col lg={5}>
            
            
          </Col>
        </Row>

      </div>
    )
  }
}



export default Notes;
