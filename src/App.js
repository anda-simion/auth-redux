import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TopNav2 from "./components/TopNav2";
import Logout from  "./containers/Logout"
import "./App.css";
import NotificationList from "./components/notifications/NotificationList";

function App({ history }) {
  console.log("history", history)
  return (
    <ConnectedRouter history={history}>
    <NotificationList />
      <TopNav2 />
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
