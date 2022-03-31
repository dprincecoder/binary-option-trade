import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSagas";

//initialize the saga middleware
const sagaMiddleware = createSagaMiddleware();

//export saga middleware
export const middleware = [thunk, sagaMiddleware, logger];

//create store enhancer
const store = createStore(rootReducer, applyMiddleware(...middleware));

//run the root saga
sagaMiddleware.run(rootSaga);

//export root store
export default store;
