import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withDrupalOauthConsumer from './../drupal-oauth/withDrupalOauthConsumer';
import SignIn from '../SignIn/SignIn';
import LogoutLink from '../LogoutLink/LogoutLink';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
        >
          {props.siteTitle}
        </Typography>
        <div>
            <Button
              component={Link}
              to="/"
              color="inherit"
            >
              Home
            </Button>
            {props.userAuthenticated ?
              <>
                <Button variant="outlined" component={Link} to="/user/profile">My Account</Button>
                <LogoutLink/>
              </>
              :
              <SignIn />
            }
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withDrupalOauthConsumer(Navigation);
