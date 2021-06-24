import React, {FunctionComponent} from "react";

import {AppBar, Box, Button, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import {Settings as SettingsIcon} from "@material-ui/icons"

import {Link} from "react-router-dom";
import {useStore} from "../store";

import {ProjectSelect} from "./project";
import {FactorySelect} from "./factory";
import {EnvironmentSelect} from "./environment";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    span: {
        flexGrow: 1
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
                <IconButton edge="start" className={classes.menuButton} color={"inherit"} component={Link} to={"/"}
                            onClick={handleClick}>
                    <img src={"logo.png"} alt={"logo"} width={25}/>
                </IconButton>
                <ProjectSelect/>
                <Box className={classes.span}/>
                <IconButton color={"inherit"} component={Link} to={"/login"}>
                    <SettingsIcon/>
                </IconButton>
            </Toolbar>
            <Toolbar style={{backgroundColor: "#333333"}} variant={"dense"}>
                <Button color={"inherit"}>Jobs</Button>
                <Button color={"inherit"}>Task Force</Button>
                <Button color={"inherit"}>Robots</Button>
                <Button color={"inherit"}>Factories</Button>
                <Box className={classes.span}/>
                <FactorySelect/>
                <EnvironmentSelect/>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);