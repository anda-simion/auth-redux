import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopNav from "./components/TopNav";

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <TopNav />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
