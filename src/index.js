import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./component/App";
import reducer from "./reducers/allReducer";
import { showPosts } from "./actions/postActions";
import { loadAuthors } from "./actions/authorActions";

import { BrowserRouter } from "react-router-dom";
import ReduxPromise from "redux-promise";

import thunk from "redux-thunk";

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStore(reducer);
//const store = createStoreWithMiddleware(reducer);
const store = createStore(
  reducer,

  applyMiddleware(thunk)
);
let postPromise = store.dispatch(showPosts());

postPromise.then(() => {
  let error = store.getState().isError;
  console.log(store.getState());
  if (!store.getState().commonReducer.isError) {
    store.dispatch(loadAuthors());
  }
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
