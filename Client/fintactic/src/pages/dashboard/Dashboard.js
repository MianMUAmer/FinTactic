import "./Dashboard.module.scss";
import React from "react";
import first from "../../images/people/first.jpg";
import second from "../../images/people/second.jpg";
import third from "../../images/people/third.jpg";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function componentDidMount()
  {
    console.log(this.props.location.state.employee);
  }
function Dashboard() {

  
  return (
    <div className="App">
      <h1 className="page-title" style={{color:"black"}}>
        Home
      </h1>
      
       <div className="row" style={{marginBottom:30}}>
      <div className="column">
     
       
        <div class="container" style={{width: 450,marginLeft:15}}>
        <Card className="card-chart">
              <CardHeader>
                <h4 className="card-category">Educational Videos</h4>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 7
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                
                </div>
              </CardBody>
            </Card>
        </div>
      
      </div>
      <div className="column">
     
       
        <div class="container" style={{width: 450,marginLeft:25}}>
        <Card className="card-chart">
              <CardHeader>
                <h4 className="card-category">Financial Indicator Types</h4>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 4
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                
                </div>
              </CardBody>
            </Card>
        </div>
      
      </div>
      <div className="column">
     
       
        <div class="container" style={{width: 450,marginLeft:25}}>
        <Card className="card-chart">
              <CardHeader>
                <h4 className="card-category">Asset Types</h4>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 3
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                
                </div>
              </CardBody>
            </Card>
        </div>
     
      </div>
   

      </div>
       {/* sdsd */}
      <div className="row">
      <div className="column">
      <div className="card" style={{width: 450,marginLeft:15, boxShadow: "2px 5px 20px black"}} >
        <img src={third} alt="Avatar" width="450" height="250" />
        <div class="container">
          <p>Our most important mission is to educate people how to invest wisely. Superior videos in the</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card" style={{width: 450, marginLeft: 25, boxShadow: "2px 5px 20px black"}}>
        <img src={second} alt="Avatar" width="450" height="250" />
        <div class="container">
          <p>FinTacTic helps its users during their investment decisions. We are always here with you every step of the investment!</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card" style={{width: 450, marginLeft: 25,  boxShadow: "2px 5px 20px black"}}>
        <img src={first} alt="Avatar" width="450" height="250" />
        <div class="container">
          <p>Invest smartly, earn plenty! Our financial analysis best suits the people who seeks to earn money.</p>
        </div>
      </div>
      </div>

      </div>
      </div>
  );
}


export default Dashboard;
