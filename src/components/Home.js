import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import passion from '../assets/passion.jpg'
import { Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${passion})`,
        backgroundPosition: 'center bottom',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '90vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -1,
        
    },
    sad: {
        marginTop: '6.5em',
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.5em"
        }
    },
    uniteButton: {
        color: 'white',
        margin: '0 auto',
        marginTop: '1em',
        backgroundColor: theme.palette.common.orange,
        minWidth: '10em',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))

const Home = (props) => {

    const classes = useStyles();
    const theme = useTheme()

    return (
        <div className={classes.hero}>
            <div  style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'center'}}>
                <Grid container direction='column' alignItems='center' className={classes.sad}>
                    <Grid item>
                        <Typography variant='h2' align='center'>
                            All your communities in one place
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/register"
                            className={classes.uniteButton}
                            variant="contained"
                            size='large'
                            onClick={() => props.setValue(3)}
                            
                        >
                        Unite NOW!
                        </Button>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default Home
