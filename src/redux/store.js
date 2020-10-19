import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducer";

const logger = (store) => (next) => (action) => {
  //console.log('dispatching', action);
  let result = next(action);
  //console.log('next state', store.getState());
  return result;
};

const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleware = [thunk, logger, crashReporter];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
