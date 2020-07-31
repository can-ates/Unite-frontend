import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import Unite from '../../assets/unite.png'

const useStyles = makeStyles(theme => ({
    footer : {
        backgroundColor: '#121414',
        height: '250px'
    },
    footer__left : {
        padding: '2em'
    },  
    footer__image : {
        objectFit: 'contain',
        height: '50px',
        width: '150px',
    },
    footer__icon : {
        color: '#E8E6E3',
        marginRight: '1em',
        fontSize: '2rem',
        textDecoration: 'none',
    },
    footer__right : {
        padding: '2em'
    },
    footer__title: {
        color : '#67717a',
        fontsize : '1rem',
        lineHeight: '24px'
    },
    footer__subtitle: {
        color : 'white',
        fontsize : '1rem',
        lineHeight: '24px',
    }
}))

const Footer = () => {
    const classes = useStyles();
    
    return (
    <Hidden smDown>
        <div className={classes.footer}>
            <Grid container direction='row'>
                <Grid item container direction='column' sm={6} className={classes.footer__left}>
                    <Grid item>
                        <img className={classes.footer__image} src={Unite} alt="unite logo"/>
                    </Grid>
                    <Grid item style={{marginTop: '1em'}}>
                        <IconButton onClick={() => window.open('https://github.com/can-ates', "_blank")}>
                            <GitHubIcon  className={classes.footer__icon} />
                        </IconButton>
                        
                        <IconButton onClick={() => window.open('https://twitter.com/', "_blank")}>
                            <TwitterIcon className={classes.footer__icon} />
                        </IconButton>    
                    </Grid>
                </Grid>
                <Grid item container sm={6} className={classes.footer__right} spacing={5}>
                    <Grid item container direction='column' sm={4} spacing={1}>
                        <Grid item>
                            <span className={classes.footer__title}>Apps</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Mac</span>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' sm={4} spacing={1}>
                        <Grid item>
                            <span className={classes.footer__title}>Support</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Community</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Bug reports</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Feature requests</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Email support</span>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' sm={4} spacing={1}>
                        <Grid item>
                            <span className={classes.footer__title}>Safety</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Code of Conduct</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Privacy Statement</span>
                        </Grid>
                        <Grid item>
                            <span className={classes.footer__subtitle}>Terms of Service</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Hidden>
        
    )
}

export default Footer
