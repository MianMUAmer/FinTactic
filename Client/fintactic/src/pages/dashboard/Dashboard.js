import "./Dashboard.module.scss";
import React from "react";
import first from "../../images/people/first.jpg";
import second from "../../images/people/second.jpg";
import third from "../../images/people/third.jpg";


function Dashboard() {


  return (
    <div className="App">
      <h1 className="page-title" style={{color:"black"}}>
        Home
      </h1>
      <div className="row">
      <div className="column">
      <div className="card" style={{width: 350, boxShadow: "2px 5px 30px black"}} >
        <img src={third} alt="Avatar" width="350" height="250" />
        <div class="container">
          <p>Our most important mission is to educate people how to invest wisely. Superior videos in the Education tab are ready to coach you!</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card" style={{width: 350, marginLeft: 15, boxShadow: "2px 5px 30px black"}}>
        <img src={second} alt="Avatar" width="350" height="250" />
        <div class="container">
          <p>FinTactic helps its users during their investment decisions. We are always here with you every step of the investment!</p>
        </div>
      </div>
      </div>
      <div className="column">
      <div className="card" style={{width: 350, marginLeft: 15,  boxShadow: "2px 5px 30px black"}}>
        <img src={first} alt="Avatar" width="350" height="250" />
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
