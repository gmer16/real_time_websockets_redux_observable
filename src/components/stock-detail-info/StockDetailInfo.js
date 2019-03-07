import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { fetchStockDetails, cancelFetchStockDetails } from '../../redux/ducks/stockDetails';
import Realtime from '../esnet-chart/EsnetChart';
import TableData from '../table-data/TableData';
import { Typography } from '@material-ui/core';
import { Provider, connect } from 'react-redux';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  button: {
    // textAlign: 'right'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
  },
  iconSmall: {
    fontSize: 20,
  },
  bg: {
    backgroundColor: '#00695C',
    color: 'white',
    padding: theme.spacing.unit,
  },
  title: {
    textAlign: 'center',
  },
});

let StockDetailInfo = ({ classes, tickers, ticker, stockDetails, fetchStockDetails, cancelFetchStockDetails }) => {
  const tickerData = tickers[ticker];
  return (
    <Grid item xs={12} key={ticker} className={classes.bg}>
      <Paper className={classes.paper}>
        <Typography 
          variant="h4" 
          component="h2"
          color="black"
          // gutterBottom
        >
          {ticker}: {tickerData.latest} 
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <TableData data={stockDetails[ticker]} />
      </Paper>    
      <Paper className={classes.paper}>
        <Typography 
          variant="h6" 
          component="h5"
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          Price in real-time
        </Typography>
        <Realtime ticker={ticker}/>
      </Paper>
    </Grid>
  )
}

StockDetailInfo = connect(
  ({ tickers, stockDetails }) => ({ tickers, stockDetails }),
  { fetchStockDetails, cancelFetchStockDetails }
)(withStyles(styles)(StockDetailInfo));

export default StockDetailInfo;