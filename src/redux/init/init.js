import { stockTickerEpic, tickers } from '../ducks/tickers';
import { 
  fetchStockDetailsEpic,
  stockDetails,
  fetchStockDetailsError,
  isFetchingStockDetails
} from '../ducks/stockDetails';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';


export const initRedux = () => {
  console.log('Initializing Redux ...');
  const rootReducer = combineReducers({
    tickers,
    stockDetails,
    fetchStockDetailsError,
    isFetchingStockDetails
  })

  const epicMiddleware = createEpicMiddleware();


  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
  );

  const rootEpic = combineEpics(
    stockTickerEpic,
    fetchStockDetailsEpic
  );

  epicMiddleware.run(rootEpic);

  return store;

}
