import React, { Fragment, useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItem } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountPopover from './accountPopover';
import { MyContext } from '../../../App';
import AccountService from '../../../services/accountService';
import { mainList } from "./mainList";

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://lextatico.com.br/">
//                 Lextatico
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        "& button": {
            [theme.breakpoints.up("sm")]: {
                // display: "none"
            }
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${theme.spacing(7)}px)`,
        },
        [theme.breakpoints.down("sm")]: {
            width: `calc(100%)`,
        }
    },
    appBarShift: {
        marginLeft: theme.spacing(7),
        width: `calc(100% - ${theme.spacing(30)}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            // display: "none"
        },
        [theme.breakpoints.down("sm")]: {
            display: "unset"
        }
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "fixed",
        overflowY: "auto",
        whiteSpace: 'nowrap',
        width: theme.spacing(30),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7),
        },
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(0)
        },
        "& button": {
            [theme.breakpoints.up("sm")]: {
                display: "none"
            }
        }
    },
    content: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(8),
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    boxCopyright: {
        position: "fixed",
        backgroundColor: theme.palette.background.paper,
        bottom: 0,
        padding: theme.spacing(0.5),
        width: `calc(100%)`
    }
}));

const useStyleItemLink = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.action.selected
    },
    upper: {
        textTransform: "uppercase"
    }
}));


function ListItemLink(props) {
    const classes = useStyleItemLink();

    return <ListItem className={classes.upper} activeClassName={classes.active} button component={NavLink} {...props} />;
}

export default function Layout({ children }) {
    const { setUser, setAuthenticated } = useContext(MyContext);

    const classes = useStyles();
    const route = useRouteMatch();

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        AccountService.logout(setUser);

        setAuthenticated(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {mainList.find((val) => val.route === route.path).name}
                    </Typography>
                    <AccountPopover handleLogout={handleLogout} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainList.map((val, index) => {
                    return (
                        <Fragment title={val.name}>
                            <ListItemLink to={val.route}>
                                <ListItemIcon>
                                    <val.icon />
                                </ListItemIcon>
                                <ListItemText primary={val.name} />
                            </ListItemLink>
                            <Divider />
                        </Fragment>
                    );
                })}</List>
            </Drawer>
            <Container className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </Container>
            {/* <Box className={classes.boxCopyright} >
                <Copyright />
            </Box> */}
        </div>
    );
}
