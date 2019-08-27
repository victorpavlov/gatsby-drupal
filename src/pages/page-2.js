import React from 'react'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const SecondPage = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <Paper className={classes.root}>
        <Typography variant="h2">Hi from the second page</Typography>
        <Typography variant="subtitle1" paragraph>
        Welcome to page 2 using <a href="https://material-ui.com">Material UI</a> for the UI.
        </Typography>
        <Link to="/">Go back to the homepage</Link>
      </Paper>
    </Layout>
  );
}

export default SecondPage
