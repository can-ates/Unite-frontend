import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '20em',
    maxWidth: '25em',
    boxShadow: '0px 0px 25px -16px rgba(11,114,185,1)',
    '&:hover': {
      boxShadow: '0px 0px 25px 1px rgba(255,186,96,0.75)',
    },
    backgroundColor: '#f9f9f9',
  },
  content: {
    textAlign: 'left',
  },
  visit: {
    margin: '0 auto',
    marginBottom: '1em',
    borderRadius: '10px',
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    letterSpacing: '1px',
    padding: '0.6em 0.8em',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    fontSize: '0.90rem',
  },
  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none',
    },
  },
}));

const CardCommunity = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleVisit = () => {
    props.history.push(`/community/${props.id}`);
  };

  const goToLogin = () => {
    props.history.push('/joinus');
  };

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        style={{ maxWidth: props.width ? props.width : '25em' }}
      >
        <CardMedia
          style={{ height: 200, objectFit: 'contain', }}
          image={props.image}
          component='img'
          title='community image'
        />

        <CardContent className={classes.content}>
          <Typography variant='h6' style={{ color: theme.palette.common.blue }}>
            {props.title}
          </Typography>
          <Typography variant='subtitle2'>{props.description}</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon
              size='small'
              color='secondary'
              style={{ marginRight: '2px' }}
            />
            <Typography display='inline' variant='subtitle1'>
              {props.members} Members
            </Typography>
            {props.isFounder && (
              <Button
                variant='outlined'
                onClick={() => setOpen(true)}
                className={classes.deleteButton}
              >
                Delete
              </Button>
            )}
          </div>
        </CardContent>
        <CardActions>
          {props.isMember ? null : (
            <Button
              onClick={
                props.isAuth
                  ? props.beMember
                    ? props.beMember
                    : handleVisit
                  : goToLogin
              }
              fullWidth
              size='small'
              variant='contained'
              className={classes.visit}
            >
              {props.buttonText}
            </Button>
          )}
        </CardActions>
      </Card>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography style={{ marginBottom: '2em' }} color='secondary'>
              Community will be deleted permanently
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => setOpen(false)}
                style={{ backgroundColor: 'grey', color: 'white' }}
              >
                Cancel
              </Button>
              <Button
                onClick={props.deleteCommunity}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default React.memo(withRouter(CardCommunity));
