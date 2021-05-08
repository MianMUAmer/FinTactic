import "./Dashboard.module.scss";
import React from "react";
import first from "../../images/people/Home5.jpg";
import second from "../../images/people/Home4.jpg";
import third from "../../images/people/Home8.jpg";
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
     
       
        <div class="container" style={{width: 400}}>
        <Card className="card-chart gradient2" style={{color: "white"}}>
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
     
       
        <div class="container" style={{width: 400}}>
        <Card className="card-chart gradient2" style={{color: "white"}}>
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
     
       
        <div class="container" style={{width: 400}}>
        <Card className="card-chart gradient2" style={{color: "white"}}>
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
      <div className="card " style={{width: 370, marginLeft:15, boxShadow: "2px 5px 20px black"}} >
        <img src={third} alt="Avatar" width="370" height="250" />
        <div class="container">
          <p style={{fontWeight: "500"}}>Our most important mission is to educate people how to invest wisely. Superior videos in the Education tab are ready to coach you!</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card " style={{width: 370, marginLeft: 30, boxShadow: "2px 5px 20px black"}}>
        <img src={second} alt="Avatar" width="370" height="250" />
        <div class="container ">
          <p style={{fontWeight: "500"}}>FinTacTic helps its users during their investment decisions. We are always here with you every step of the investment!</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card " style={{width: 370, height: 328, marginLeft: 30,  boxShadow: "2px 5px 20px black"}}>
        <img src={first} alt="Avatar" width="370" height="250" />
        <div class="container ">
          <p style={{fontWeight: "500"}}> Invest smartly, earn plenty! Our financial analysis best suits the people who seeks to earn money.</p>
        </div>
      </div>
      </div>

      </div>
      </div>
  );
}


export default Dashboard;
