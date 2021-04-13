import React, {FunctionComponent} from "react";

import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";

import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStore} from "../store";

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
    const rootStore = useStore();

    const handleClick = () => {
        rootStore.setTitle("Math.random()::" + Math.random() * 1000)
    }
    return (
        <AppBar position={"static"} className={classes.root}>
            <Toolbar variant={"dense"}>
                <IconButton edge="start" className={classes.menuButton} color={"inherit"} component={Link} to={"/"} onClick={handleClick}>
                    <img src={"logo.png"} alt={"logo"} width={25}/>
                </IconButton>
                <Typography className={classes.title}>
                    {rootStore.title}
                </Typography>
                <Button color={"inherit"} component={Link} to={"/login"}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);