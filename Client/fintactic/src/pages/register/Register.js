import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";
import Widget from "../../components/Widget";
import { registerUser, registerError } from "../../actions/register";
import Login from "../login";
import Logo from "../../images/imgedu/112.jpg";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.props.dispatch(registerError("Password field is empty"));
      } else {
        this.props.dispatch(registerError("Passwords are not equal"));
      }
      setTimeout(() => {
        this.props.dispatch(registerError());
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  doRegister(e) {
    e.preventDefault();
    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.props.dispatch(
        registerUser({
          creds: {
            email: this.state.email,
            password: this.state.password,
          },
          history: this.props.history,
        })
      );
    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    }; // eslint-disable-line

    //Cant access login page while logged in
    if (
      Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
    ) {
      return <Redirect to={from} />;
    }

    return (
      <div
        className="auth-page gradient3"
        
      >
        <Container id="containerRegistration" style={{ marginTop: "60px" }}>
          <div className="wrapper" >
            <div className="wrapperFintacticRegister">
              <img src={Logo} style={{marginTop: "35px"}}></img>
            </div>
          </div>
          <div className="wrapper">
            <Widget
              className="widget-auth mx-auto"
              title={<h3 className="mt-0">Register</h3>}
            >
              <form onSubmit={this.doRegister}>
                {this.props.errorMessage && (
                  <Alert
                    className="alert-sm widget-middle-overflow rounded-0"
                    color="danger"
                  >
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup className="mt">
                  <Label for="email">Email</Label>
                  <InputGroup className="input-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="la la-user text-white" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="email"
                      className="input-transparent pl-3"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      type="email"
                      required
                      name="email"
                      placeholder="Email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <InputGroup className="input-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="la la-lock text-white" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="password"
                      className="input-transparent pl-3"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm</Label>
                  <InputGroup className="input-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="la la-lock text-white" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="confirmPassword"
                      className="input-transparent pl-3"
                      value={this.state.confirmPassword}
                      onChange={this.changeConfirmPassword}
                      onBlur={this.checkPassword}
                      type="password"
                      required
                      name="confirmPassword"
                      placeholder="Confirm"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="bg-widget-transparent auth-widget-footer">
                  <Button
                    type="submit"
                    color="danger"
                    className="auth-btn"
                    size="sm"
                    style={{ color: "#fff" }}
                  >
                    {this.props.isFetching ? "Loading..." : "Register"}
                  </Button>
                  <p className="widget-auth-info mt-4" style={{color: "white", fontWeight: "500"}}>
                    Already have the account?
                  </p>
                  <Link className="d-block text-center mb-4" to="login" style={{color: "white", fontWeight: "500",textDecorationLine: 'underline' }}>
                    Login Now!
                  </Link>
                </div>
              </form>
            </Widget>
          </div>
        </Container>
        <footer className="auth-footer" style={{color: "white", fontWeight: "500"}}>
          {new Date().getFullYear()} &copy; All rights reserved!{" "}
          <a href="" rel="noopener noreferrer" target="_blank" style={{color: "white", fontWeight: "500", textDecorationLine: 'underline'}}>
            FinTacTic
          </a>
          !
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.register.isFetching,
    errorMessage: state.register.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
