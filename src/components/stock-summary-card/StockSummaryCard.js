import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { addTicker, removeTicker } from '../../redux/ducks/tickers';
import Realtime from '../esnet-chart/EsnetChart';
import { Typography } from '@material-ui/core';
import { Provider, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typist from 'react-typist';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  bg: {
    backgroundColor: '#00695C',
    color: 'white',
    padding: theme.spacing.unit,
    // margin: theme.spacing.unit / 4
  },
  paper: {
    padding: theme.spacing.unit * 2,
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    // padding: 30,
    // margin: 20
  },
  button: {
    // textAlign: 'right'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    color: 'white'
  },
  iconSmall: {
    fontSize: 20,
  },
});

let StockSummaryCard = ({ classes, ticker, tickerData, removeTicker, history }) => {
  return (
    <Grid item xs={4} key={ticker} className={classes.bg}>
      <Paper className={classes.paper} onClick={() => {history.push(`/api/stocks/${ticker}`)}}>
        <Typography 
          variant="h4" 
          component="h2"
          color="black"
          gutterBottom
        >
          {ticker}: {tickerData.latest} 
        </Typography>
        <Realtime ticker={ticker}/>
      </Paper>
      <IconButton 
        size="small"
        aria-label="Delete"
        color="white" 
        className={classes.button}
        onClick={() => {
          if (ticker) {
            removeTicker(ticker);
          } 
        }}
      >
        <DeleteIcon className={classes.rightIcon} />
      </IconButton>
    </Grid>
  )
}

StockSummaryCard = connect(
  null,
  { removeTicker }
)(withRouter(withStyles(styles)(StockSummaryCard)));

export default StockSummaryCard;