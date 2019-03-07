import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay, map, filter, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

const FETCH_STOCK_DETAILS = 'FETCH_STOCK_DETAILS';
const FETCH_STOCK_DETAILS_FULFILLED = 'FETCH_STOCK_DETAILS_FULFILLED';
const FETCH_STOCK_DETAILS_REJECTED = 'FETCH_STOCK_DETAILS_REJECTED';
const FETCH_STOCK_DETAILS_CANCELLED = 'FETCH_STOCK_DETAILS_CANCELLED';

export const fetchStockDetails = id => ({ type: FETCH_STOCK_DETAILS, payload: id }) ;
export const fetchStockDetailsFulfilled = (ticker, payload) => ({ type: FETCH_STOCK_DETAILS_FULFILLED, ticker, payload });
export const cancelFetchStockDetails = () => ({ type: FETCH_STOCK_DETAILS_CANCELLED });
export const fetchStockDetailsRejected = payload => ({ type: FETCH_STOCK_DETAILS_REJECTED, payload, error: true });


const fakeAjax = url => of({
  id: url.substring(url.lastIndexOf('/') + 1),
  Director: 'Bilbo Bridgewater',
  HQ: 'Cincinnati, OH',
  morningstarRating: 'Gold'
}).pipe(delay(1000));

export const fetchStockDetailsEpic = action$ => action$.pipe(
  ofType(FETCH_STOCK_DETAILS),
  mergeMap(action => fakeAjax(`/api/stocks/${action.payload}`).pipe(
    map(response => fetchStockDetailsFulfilled(action.payload, response)),
    takeUntil(action$.pipe(
      filter(action => action.type === FETCH_STOCK_DETAILS_CANCELLED)
    ))
  ))
);

export const stockDetails = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOCK_DETAILS:
      return {};

    case FETCH_STOCK_DETAILS_FULFILLED:
      console.log(action);
      return {
        ...state,
        [action.ticker]: action.payload
      };

    default:
      return state;
  }
}

export const fetchStockDetailsError = (state = null, action) => {
  switch (action.type) {
    case FETCH_STOCK_DETAILS:
    case FETCH_STOCK_DETAILS_FULFILLED:
      return null;
    
    case FETCH_STOCK_DETAILS_REJECTED:
      return action.payload;

    default:
      return state;
  }
}

export const isFetchingStockDetails = (state = false, action) => {
  switch (action.type) {
    case FETCH_STOCK_DETAILS:
      return true;

    case FETCH_STOCK_DETAILS_FULFILLED:
    case FETCH_STOCK_DETAILS_CANCELLED:
      return false;

    default:
      return state;
  }
}
