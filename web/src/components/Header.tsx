import React, {FunctionComponent} from "react";

import {AppBar, Box, Button, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import {Settings as SettingsIcon} from "@material-ui/icons"

import {Link} from "react-router-dom";

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
    },
    button: {
        "&:hover": {
            border: "solid 1px gray",
            borderRadius: "4px"
        }
    }
}));

const Header: FunctionComponent = (props) => {
    const classes = useStyles();

    const handleClick = () => {
        console.log("Header::handleClick");
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
                <IconButton color={"inherit"} component={Link} to={"/settings"}>
                    <SettingsIcon/>
                </IconButton>
            </Toolbar>
            <Toolbar style={{backgroundColor: "#333333"}} variant={"dense"}>
                <Button className={classes.button} variant={"text"} color={"inherit"} component={Link}
                        to={"/job"}>Jobs</Button>
                <Button className={classes.button} variant={"text"} color={"inherit"} component={Link}
                        to={"/task-force"}>Task Force</Button>
                <Button className={classes.button} variant={"text"} color={"inherit"} component={Link}
                        to={"/robot"}>Robots</Button>
                <Button className={classes.button} variant={"text"} color={"inherit"} component={Link}
                        to={"/factory"}>Factories</Button>
                <Box className={classes.span}/>
                <FactorySelect/>
                <EnvironmentSelect/>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);