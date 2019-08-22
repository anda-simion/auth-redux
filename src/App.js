import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TopNav from "./components/TopNav";
import Logout from "./containers/Logout";
import "./App.css";
import NotificationList from "./components/notifications/NotificationList";

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <NotificationList />
      <TopNav />
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

export default App;
