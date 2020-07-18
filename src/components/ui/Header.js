import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Unite from '../../assets/unite.png'

import Auth from '../../hoc/Auth'

function ElevationScroll(props) {
    const { children } = props;
  
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0
    });
  }

const useStyles = makeStyles(theme => ({

    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.5em"
        }
    },
    logoContainer: {
        padding: 0,
    },
    logo: {
        height: '6.5em',
        width: '11em'
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        color: '#fff',
        minWidth: '6.5em',
        marginLeft: '1.5em'
    }
}))


const Header = (props) => {
    const [toggleHeader, setToggleHeader] = useState(false)
    

    const pages = [
        { name: "Home", link: "/", activeIndex: 0 },
        {
          name: "Communities", link: "/communities", activeIndex: 1
        },
        { name: "Join Us", link: "/joinus", activeIndex: 2 },
        { name: "Logout", link: "/contact", activeIndex: 3 }
      ];


    useEffect(() => {
        
        [...pages].forEach(page => {
          switch (window.location.pathname) {
            case `${page.link}`:
              if (props.value !== page.activeIndex) {
                props.setValue(page.activeIndex);
              }
              break;
            default:
              break;
          }
        });
        
      }, [props.value, pages, props]);
    
    const handleChange = (newValue) => {
        props.setValue(newValue);
    }    
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    })

    const handleScroll = () => {
        window.scrollY > 0 ? setToggleHeader(true) : setToggleHeader(false)
    }


    const classes = useStyles();
    const theme = useTheme()


    const tabs = (
        <React.Fragment>
            <Tabs
                value={props.value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor='primary'
                centered={true}
            >
                {pages.map((page, i) => (
                    <Tab
                        key={`${page}-${i}`}
                        className={classes.tab}
                        component={Link}
                        to={page.link}
                        label={page.name}
                        disableRipple
                        value={page.activeIndex}
                    />
                ))}
            </Tabs>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={toggleHeader ? 'fixed' : 'absolute'} className={classes.appbar} style={{backgroundColor: toggleHeader ? null : "transparent"}}>
                    <Toolbar>
                        <Button
                            component={Link}
                            to='/'
                            disableRipple
                            className={classes.logoContainer}
                        >
                            <img alt='site logo' className={classes.logo} src={Unite} />
                        </Button>
                        {tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default Header
