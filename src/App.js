import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TopNav from "./components/TopNav";
import Logout from "./containers/Logout";
import NotificationList from "./components/notifications/NotificationList";
import { notificationsSelector } from "./store/notifications/selectors";
import { isLoggedInSelector, userSelector } from "./store/user/selectors";
import "./App.css";

function App({ history, notifications, is_logged_in, user }) {
  return (
    <ConnectedRouter history={history}>
      <NotificationList notifications={notifications} />
      <TopNav user={user} is_logged_in={is_logged_in} />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => ({
  notifications: notificationsSelector(state),
  is_logged_in: isLoggedInSelector(state),
  user: userSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(App);
