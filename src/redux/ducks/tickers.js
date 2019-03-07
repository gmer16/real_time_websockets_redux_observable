import { mergeMap, map, takeUntil, retryWhen, filter} from 'rxjs/operators' ;
import { Observable } from 'rxjs-compat';
import { WebSocket } from 'mock-socket';
import { ofType } from 'redux-observable';
import Ring from 'ringjs';

import {
  TimeSeries,
  TimeRange,
  TimeEvent,
  Pipeline as pipeline,
  Stream,
  EventOut,
  percentile
} from "pondjs";

export const addTicker = ticker => ({ type: 'ADD_TICKER', ticker });
export const removeTicker = ticker => ({ type: 'REMOVE_TICKER', ticker });


const socket$ = Observable.webSocket({
  url: "ws://somesocket",
  WebSocketCtor: WebSocket
});

// const socket$ = Observable.webSocket("ws://thewebsocketurl");


export const stockTickerEpic = (action$, store) =>
  action$.pipe(
    ofType('ADD_TICKER'),
    mergeMap(action => 
      socket$.multiplex(
        () => ({
          type: 'subscribe',
          ticker: action.ticker
        }),
        () => ({
          type: 'unsubscribe',
          ticker: action.ticker
        }),
        msg => msg.ticker === action.ticker
      ).pipe(
      retryWhen(err => {
        if (window.navigator.onLine) {
          return Observable.timer(1000);
        } else {
          return Observable.fromEvent(window, 'online');
        }
      }),
      takeUntil(
        action$.pipe(
          ofType('REMOVE_TICKER'),
          filter(closeAction => closeAction.ticker === action.ticker)
        )
      ),
      map(tick => ({
        type: 'TICKER_TICK',
        ticker: tick.ticker,
        value: tick.value,
        timestamp: tick.timestamp
      })))
    )
  );

export const tickers = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TICKER':
      console.log('ADD_TICKER action triggered')
      return {
        ...state,
        [action.ticker]: {
          time: new Date(),
          events: new Ring(200),
          latest: null,
          details: null
        }
      };

    case 'TICKER_TICK':
      let tickerState = state[action.ticker];
      let newTickerState = processNewEvent(action.value, tickerState);
      return {
        ...state,
        [action.ticker]: newTickerState
      };

    case 'REMOVE_TICKER':
      const key = action.ticker;
      const {[key]: value, ...withoutTicker} = state;
      return withoutTicker;

    default:
      return state;
  }
};

// helper functions

const processNewEvent = (value, tickerState) => {
  let newTickerState = {
    time: new Date(),
    events: new Ring(200),
    latest: value,
    details: tickerState.details
  };

  const sec = 1000;
  const minute = 60 * sec;
  const hours = 60 * minute;
  const rate = 80

  let t = new Date();

  const getNewEvent = (value) => {
    // the time is set to when the value is received by the client
    return new TimeEvent(t.getTime(), value);
  };

  const event = getNewEvent(value);

  // Raw events
  const newEvents = tickerState.events;
  newEvents.push(event);
  newTickerState.time = t;
  newTickerState.events = newEvents;

  return newTickerState;
}