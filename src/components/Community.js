import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Grid from "@material-ui/core/Grid";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

}))

const Community = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    useEffect(() => {
        props.setValue(1)
    })

    return (
        <Grid container direction='row'>
            <Grid item lg={4}>
            s
            </Grid>
            <Grid item lg={8}>
            a
            </Grid>
        </Grid>
    )
}

export default Community
