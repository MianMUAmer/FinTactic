import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Progress, Alert } from "reactstrap";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";
import img from "../../images/people/logo.png";

import { changeActiveSidebarItem } from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: "",
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={cx(s.root)}
        ref={(nav) => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          <h2>FinTacTic</h2>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Home"
            isHeader
            iconName="flaticon-home"
            link="/app/main"
            index="main"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Bookmarks"
            isHeader
            iconName="flaticon-bookmark"
            link="/app/bookmarks"
            index="core"
          />
          <LinksGroup
            onActiveSidebarItemChange={(t) =>
              this.props.dispatch(changeActiveSidebarItem(t))
            }
            activeItem={this.props.activeItem}
            header="Education"
            isHeader
            iconName="flaticon-play-button-1"
            link="/app/education"
            index="tables"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Visualization"
            isHeader
            iconName="flaticon-view"
            link="/app/visualization"
            index="ui"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Correlate"
            isHeader
            iconName="flaticon-shuffle"
            link="/app/correlate"
            index="ui"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Reports"
            isHeader
            iconName="flaticon-notepad"
            link="/app/reports"
            index="ui"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="States"
            isHeader
            iconName="flaticon-note"
            link="/app/notes"
            index="forms"
          />
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
