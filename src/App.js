import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleCard from './SimpleCard';
import Dashboard from './components/dashboard/Dashboard';
import StockDetailInfo from './components/stock-detail-info/StockDetailInfo';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { fetchStockDetails, cancelFetchStockDetails } from './redux/ducks/stockDetails';
import { Provider, connect } from 'react-redux';



let App = ({ fetchStockDetails }) => {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route 
            path="/api/stocks/:stock"
            render={ props => {
              fetchStockDetails(props.match.params.stock);
              return <StockDetailInfo ticker={props.match.params.stock} />;
            } }
          />
        </Switch>
      </Router>
    );
}

App = connect(
  null,
  { fetchStockDetails }
)(App);

export default App;
