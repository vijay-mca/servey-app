import "./style/styles.css";

import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import Question from "../src/component/QuestionListing";
import Admin from "./component/Admin/Login";
import Dashboard from "./component/Admin//Dashboard";
import CreateQuestion from "./component/Admin/CreateQuestion";
import ViewQuestion from "./component/Admin/ViewQuestion";
import Header from "./component/ui/Header";

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
        <Header  />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Question {...props} />}
            />
            <Route
              exact
              path="/login"
              component={(props) => <Admin {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              component={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/createquestion"
              component={(props) => <CreateQuestion {...props} />}
            />
            <Route
              exact
              path="/viewquestion"
              component={(props) => <ViewQuestion {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};

export default App;
