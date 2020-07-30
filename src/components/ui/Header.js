import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'


import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Unite from '../../assets/unite.png'

import Auth from '../../hoc/Auth'
import * as actions from '../../actions/user'

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
    appbar : {
        backgroundColor: '#0C7C8A',
        height: '5em'
    },

    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "1.1em",
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
        height: '5em',
        width: '15em',
        [theme.breakpoints.down('sm')]: {
            height: '3.5em',
            width: '11em'
        }

    },
    tabContainer: {
        marginLeft: 'auto',
        color:'white'
    },
    tab: {
        color: '#fff',
        minWidth: '6.5em',
        marginLeft: '1.5em'
    },
    drawer: {
        backgroundColor: '#0C7C8A'
      },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        color: 'white',
        "&:hover": {
          backgroundColor: "transparent"
        }
    },
    drawerItemSelected: {
        "&.MuiListItemText-root": {
          opacity: 1
        }
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
      },
}))



const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("sm"))
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    const [openDrawer, setOpenDrawer] = useState(false);
    const [toggleHeader, setToggleHeader] = useState(false)
    const [toggleLogOut, setToggleLogOut] = useState(false)
    

    const pages = [
        { name: "Home", link: "/", activeIndex: 0 },
        {
          name: "Communities", link: "/communities", activeIndex: 1
        },
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
        if(window.location.pathname === '/joinus'){
            props.setValue(2)
        }
        if(window.location.pathname === '/user/dashboard'){
            props.setValue(2)
        }

        
      }, [props.value, pages, props]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 0 ? setToggleHeader(true) : setToggleHeader(false)
        });
    })
    
    const handleChange = (newValue) => {
        props.setValue(newValue);
    }    
    
    const handleLogOut = () => {
        props.dispatch(actions.logOutUser()).then(() => {
            setToggleLogOut(false)
            props.history.push('/')
        })
    }


    
    const uri = window.location.pathname.split('/')[1]

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
                        value={i}
                        
                    />
                ))}
                {
                    props.user.isAuth ? null : <Tab
                        className={classes.tab}
                        disableRipple
                        label='Join us'
                        component={Link}
                        to='/joinus'
                        value={2}
                    />
                }
                {
                    props.user.isAuth ? <Tab 
                        className={classes.tab}
                        disableRipple
                        label={<Typography style={{fontSize: '0.770rem'}} variant='inherit' ><span style={{ color:'white',}}> Hello,</span><span style={{display: 'block', fontSize: '0.79rem'}} >{props.user.name}</span></Typography>}
                        onClick={() => props.history.push('/user/dashboard')}
                        value={2}
                    /> : null
                }
                {
                    props.user.isAuth ? <Tab 
                        className={classes.tab}
                        disableRipple
                        label='Log Out'
                        onClick={handleLogOut}
                        value={3}
                    /> : null
                }
            </Tabs>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <List disablePadding>
                    {pages.map((page, i) => (
                        <ListItem
                            divider
                            key={`${page}-${i}`}
                            button
                            component={Link}
                            to={page.link}
                            selected={props.value === page.activeIndex}
                            classes={{ selected: classes.drawerItemSelected }}
                            onClick={() => {
                            setOpenDrawer(false);
                            props.setValue(page.activeIndex);
                            }}
                        >
                            <ListItemText className={classes.drawerItem} disableTypography>
                            {page.name}
                            </ListItemText>
                        </ListItem>
                        ))}
                        {
                            toggleLogOut ? null : <ListItem
                                onClick={() => {
                                    setOpenDrawer(false);
                                    props.setValue(2);
                                }}
                                divider
                                button
                                component={Link}
                                to='/joinus'
                                classes={{
                                    root: classes.drawerItemEstimate,
                                    selected: classes.drawerItemSelected
                                }}
                                selected={props.value === 2}
                            >
                                <ListItemText className={classes.drawerItem} disableTypography>
                                    Join Us
                                </ListItemText>
                            
                            </ListItem>                              
                        }
                        {
                            props.user.isAuth ? <ListItem
                                onClick={() => {
                                    setOpenDrawer(false);
                                    handleLogOut()
                                }}
                                divider
                                button
                            >
                                <ListItemText className={classes.drawerItem} disableTypography>
                                    Log Out
                                </ListItemText>
                            
                            </ListItem> : null
                        }
                </List>
            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={toggleHeader ? 'fixed' : 'absolute'} className={classes.appbar} style={{backgroundColor: toggleHeader ? null : (uri === 'community' || uri === 'joinus' || uri === 'create-community' || uri === 'user') ? '#0C7C8A' : 'transparent', zIndex: '15'}}>
                    <Toolbar>
                        <Button
                            component={Link}
                            to='/'
                            disableRipple
                            className={classes.logoContainer}
                            
                        >
                            <img alt='site logo' className={classes.logo} src={Unite} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}




export default Auth(connect()(Header))