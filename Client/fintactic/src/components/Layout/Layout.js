import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import UIIcons from "../../pages/components/icons";
import Visualization from "../../pages/visualization";
import Education from "../../pages/education";
import Video from "../../pages/video";
import Bookmarks from "../../pages/bookmarks";
import Dashboard from "../../pages/dashboard";
import Correlate from "../../pages/correlate";
import Reports from "../../pages/reports";
import Notes from "../../pages/notes";
import Profile from "../../pages/Profile";

import Header from "../Header";
import Sidebar from "../Sidebar";
import BreadcrumbHistory from "../BreadcrumbHistory";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
        ].join(" ")}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar style={{position: "fixed"}}/>
          
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/login"
                      exact
                      render={() => <Redirect to="/login" />}
                    />
                    <Route
                      path="/land"
                      exact
                      render={() => <Redirect to="/land" />}
                    />
                    <Route path="/app/dashboard" exact component={Dashboard} />
                    <Route
                      path="/app/visualization"
                      exact
                      component={Visualization}
                    />
                    <Route path="/app/education" exact component={Education} />
                    <Route path="/app/video/:id" exact component={Video} />
                    <Route path="/app/bookmarks" exact component={Bookmarks} />
                    <Route path="/app/main" exact component={Dashboard} />
                    <Route path="/app/correlate" exact component={Correlate} />
                    <Route path="/app/reports" exact component={Reports} />
                    <Route path="/app/notes" exact component={Notes} />
                    <Route path="/app/profile" exact component={Profile} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
