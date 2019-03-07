import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    alignItems: 'center',
    textAlign: 'center',
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableData(props) {
  const { classes, data } = props;

  const info = (data)
    ? <TableBody>
        {Object.entries(data).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell component="th" scope="row" align="left">
              {key}
            </TableCell>
            <TableCell align="left">
              {value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    : <TableBody>
        <CircularProgress className={classes.progress} />
      </TableBody>


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <Typography 
            variant="h6" 
            component="h6"
            color="textSecondary"
            className={classes.title}
          >
            Stock information
          </Typography>
        </TableHead>
        <TableBody>
          {info}
        </TableBody>
      </Table>
    </Paper>
  );
}

TableData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableData);
