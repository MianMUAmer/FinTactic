import React from "react";
import ReactDOM from 'react-dom';
import { Row, Col } from "reactstrap";

import Widget from "../../components/Widget";
import s from "../reports/Static.module.scss";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.inputNode.value)
    fetch('/notes', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.inputNode.value)
    }).then(response => {
      return response.json
    })
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title" style={{color: "black"}}>
          Notes
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref={node => (this.inputNode = node)}
          />
        <button type="submit">SAVE</button>
      </form>
      </div>
      
    )
  }
}

export default Notes;