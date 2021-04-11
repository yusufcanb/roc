import React, {FunctionComponent} from "react";

import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";

import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 900
    }
}));

const Header: FunctionComponent = (props) => {
    const classes = useStyles();

    return (
        <AppBar position={"static"} className={classes.root}>
            <Toolbar variant={"dense"}>
                <IconButton edge="start" className={classes.menuButton} color={"inherit"} component={Link} to={"/"}>
                    <img src={"logo.png"} alt={"logo"} width={25}/>
                </IconButton>
                <Typography className={classes.title}>
                    RPA Platform
                </Typography>
                <Button color={"inherit"} component={Link} to={"/login"}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);