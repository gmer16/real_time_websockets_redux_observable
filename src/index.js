import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initRedux } from './redux/init/init';
import { Provider, connect } from 'react-redux';
import { Server } from 'mock-socket';


const mockServer = new Server('ws://somesocket');
const tickerSubs = [];

mockServer.on('connection', socket => {
  socket.on('message', msg => {
  const message = JSON.parse(msg);
  console.log('The server has received a message', message);
  switch (message.type) {
    case 'subscribe':
      if (!tickerSubs.includes(message.ticker)) {
        tickerSubs.push(message.ticker)
      }
      break;

    case 'unsubscribe':
      const index = tickerSubs.indexOf(message.ticker);
      if (index !== -1) {
        tickerSubs.splice(index, 1);
      }
      break;
  }
  setInterval(() => {
    if (tickerSubs.length > 0) {
      tickerSubs.forEach(ticker => {
        const response = JSON.stringify({
          ticker,
          value: Math.floor(Math.random() * 100),
          timestamp: new Date()
        });
        socket.send(response);
      });
    }
  }, 1000);
})
});


const store = initRedux();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
