import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import PrimarySearchAppBar from '../primary-search-app-bar/PrimarySearchAppBar';
import LabelBottomNavigation from '../label-bottom-navigation/LabelBottomNavigation';
import StockSummaryCard from '../stock-summary-card/StockSummaryCard';
import { addTicker, removeTicker } from '../../redux/ducks/tickers';
import { Provider, connect } from 'react-redux';
import Realtime from '../esnet-chart/EsnetChart';
import { Typography } from '@material-ui/core';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  bottom:  {
    width: '100%',
    position: 'relative',
    bottom: 50,
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
});

let Dashboard = ({classes, tickers, removeTicker}) => {
  return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PrimarySearchAppBar />
        </Grid>
        {tickers.map(([ticker, tickerData]) =>
          <StockSummaryCard ticker={ticker} tickerData={tickerData} />
        )}
        {/* <Grid container  direction={'row'} justify={'center'} alignItems={'flex-end'} className={classes.bottom} >
          <LabelBottomNavigation />
        </Grid> */}
      </Grid>
  );
}

Dashboard = connect(
  ({ tickers }) => ({ tickers: Object.entries(tickers) }),
  null
)(withStyles(styles)(Dashboard));

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Dashboard;
