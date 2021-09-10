import React, {FunctionComponent} from "react";

import {AppBar, Box, Button, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import {Settings as SettingsIcon} from "@material-ui/icons"

import {Link} from "react-router-dom";

import {ProjectSelect} from "../../project/components";
import {FactorySelect} from "../../factory/components";
import {EnvironmentSelect} from "../../environment/components";
import {observer} from "mobx-react-lite";
import {useStore} from "core/store";
import {Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
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
            borderRadius: "4px",
        }
    }
}));

const Header: FunctionComponent = (props) => {
    const classes = useStyles();
    const {projectStore} = useStore();

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
                <ProjectSelect projects={projectStore.projects}/>
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
                        to={"/robot"}>Repository</Button>
                <Button className={classes.button} variant={"text"} color={"inherit"} component={Link}
                        to={"/factory"}>Agents</Button>
                <Box className={classes.span}/>
                <FactorySelect/>
                <EnvironmentSelect/>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header);