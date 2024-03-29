import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

/* eslint-disable */
import ErrorPage from "../pages/error";
/* eslint-enable */

import "../styles/theme.scss";
import LayoutComponent from "../components/Layout";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/Home";
import Visualization from "../pages/visualization";
import Education from "../pages/education";
import Video from "../pages/education";
import { logoutUser } from "../actions/user";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (
    !Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
  ) {
    //dispatch(logoutUser());
    return <Redirect to="/" />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

class App extends React.PureComponent {
  render() {
    return (
      <div>
        {/* <p>Time Coming from Flask Backend : {this.props.BE_time} </p> */}
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/" exact render={() => <Redirect to="/" />} /> */}
            <Route
              path="/app"
              exact
              render={() => <Redirect to="/app/main" />}
            />
            <PrivateRoute
              path="/app"
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/viz" exact component={Visualization} />
            <Route path="/edu" exact component={Education} />
            <Route path="/app/main/video" exact component={Video} />
            <Route path="/error" exact component={ErrorPage} />
            <Route component={ErrorPage} />s
            <Redirect from="*" to="/app/main/dashboard" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const FuncComp = () => {
  const [BE_time, setBE_time] = useState(1);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setBE_time(data.time);
      });
  }, []);

  return <App BE_time={BE_time} />;
};

export { FuncComp };
export default connect(mapStateToProps)(App);
