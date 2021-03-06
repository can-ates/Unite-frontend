import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Typography } from '@material-ui/core';

import * as actions from '../actions/user';

import Auth from '../hoc/Auth';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
  hero: {
    backgroundColor: '#FAFAFA',
    height: '100vh',
    width: '100%',
    position: 'absolute',
    top: '0',
    zIndex: -10,
    overflow: 'auto',
  },
  sad: {
    marginTop: '6.5em',
    [theme.breakpoints.down('md')]: {
      marginTop: '6em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '6em',
    },
  },
  root: {
    marginTop: '2em',
    minWidth: '25em',
    backgroundColor: '#0C7C8A',
    boxShadow: '0px 0px 3px 2px rgba(0,0,0,0.75)',
    [theme.breakpoints.down('xs')]: {
      minWidth: '20em',
    },
  },
  Fields: {
    padding: '0 3.5em 2em 3.5em',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  errorMessage: {
    position: 'relative',
    minWidth: '14em',
    padding: '0',
    marginTop: '5em',
  },
}));

const JoinUs = props => {
  const [open, setOpen] = useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //REGISTER CREDENTIALS
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [password, setPassword] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  //LOGIN CREDENTIALS
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const classes = useStyles();

  const handleRegister = e => {
    e.preventDefault();
    props
      .dispatch(actions.registerUser({ name, lastname, email, password }))
      .then(response => {
        if (response.payload.errors) {
          response.payload.errors.map(err => {
            if (err.param === 'email') setEmailHelper(err.msg);
            if (err.param === 'password') setPasswordHelper(err.msg);
          });
        } else props.history.push('/');
      });
  };

  const handleLogin = e => {
    e.preventDefault();
    props
      .dispatch(
        actions.loginUser({ email: loginEmail, password: loginPassword })
      )
      .then(response => {
        if (response.payload.loginSuccess === false) {
          setLoginError(response.payload.message);
          handleMessage();
        } else props.history.push('/');
      });
  };

  return (
    <div className={classes.hero}>
      <div style={{ position: 'relative', height: '100%' }}>
        <Grid container direction='row'>
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            className={classes.sad}
            lg={6}
          >
            <Grid item>
              <Typography
                variant='h2'
                align='center'
                style={{ letterSpacing: 2 }}
              >
                Register
              </Typography>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
                <form onSubmit={handleRegister}>
                  <CardContent>
                    <Grid
                      item
                      container
                      direction='column'
                      className={classes.Fields}
                    >
                      <Grid item>
                        <Typography
                          variant='body2'
                          align='center'
                          style={{ marginTop: '1.5em' }}
                        >
                          Create an account
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Name'
                          fullWidth
                          required
                          type='text'
                          id='name'
                          name='name'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          style={{ marginBottom: '1.5em', marginTop: '2em' }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Last name'
                          fullWidth
                          type='text'
                          required
                          id='lastname'
                          name='lastname'
                          value={lastname}
                          onChange={e => setLastName(e.target.value)}
                          style={{ marginBottom: '1.5em' }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Email'
                          fullWidth
                          type='email'
                          error={emailHelper ? true : false}
                          helperText={emailHelper ? emailHelper : null}
                          id='emailRegister'
                          required
                          name='email'
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            setEmailHelper('');
                          }}
                          style={{ marginBottom: '1.5em' }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Password'
                          fullWidth
                          type='password'
                          error={passwordHelper ? true : false}
                          helperText={passwordHelper ? passwordHelper : null}
                          required
                          id='passwordRegister'
                          name='password'
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value);
                            setPasswordHelper('');
                          }}
                          style={{ marginBottom: '1em' }}
                        />
                      </Grid>
                      <Grid item>
                        <CardActions>
                          <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            style={{
                              margin: '2em auto 0 auto',
                              minWidth: '15em',
                              color: 'white',
                            }}
                            size='large'
                            disabled={
                              name && lastname && password && email
                                ? false
                                : true
                            }
                          >
                            Register
                          </Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            className={classes.sad}
            lg={6}
          >
            <Grid item>
              <Typography
                variant='h2'
                align='center'
                style={{ letterSpacing: 1.5 }}
              >
                Login
              </Typography>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
                <form onSubmit={handleLogin}>
                  <CardContent>
                    <Grid
                      item
                      container
                      direction='column'
                      className={classes.Fields}
                    >
                      <Grid item>
                        <Typography
                          variant='body2'
                          align='center'
                          style={{ marginTop: '1.5em' }}
                        >
                          Already have an account ?
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Snackbar
                          className={classes.errorMessage}
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                        >
                          <Alert onClose={handleClose} severity='error'>
                            {loginError}
                          </Alert>
                        </Snackbar>
                      </Grid>

                      <Grid item>
                        <TextField
                          label='Email'
                          fullWidth
                          type='email'
                          id='emailLogin'
                          required
                          name='email'
                          value={loginEmail}
                          onChange={e => setLoginEmail(e.target.value)}
                          style={{ marginBottom: '1.5em', marginTop: '2em' }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Password'
                          fullWidth
                          type='password'
                          required
                          id='passwordLogin'
                          name='password'
                          value={loginPassword}
                          onChange={e => setLoginPassword(e.target.value)}
                          style={{ marginBottom: '1em' }}
                        />
                      </Grid>
                      <Grid item>
                        <CardActions>
                          <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            style={{
                              margin: '2em auto 0 auto',
                              minWidth: '15em',
                              color: 'white',
                            }}
                            size='large'
                            disabled={
                              loginPassword && loginEmail ? false : true
                            }
                          >
                            Login
                          </Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default connect()(Auth(JoinUs, null));
