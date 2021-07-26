import React, {FunctionComponent} from "react";
import {makeStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {ArrowDropDown, ArrowRight as ArrowRigthIcon, SettingsApplications as NewProjectIcon} from "@material-ui/icons";
import {Divider, ListItemIcon, Typography} from "@material-ui/core";
import {useStore} from "core/store";
import {observer} from "mobx-react-lite";
import {Environment} from "../models";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "transparent",
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px",
        minWidth: "100px"
    },
    icon: {marginBottom: "2px"}
}));

const EnvironmentSelect: FunctionComponent = (props) => {
    const classes = useStyles();
    const {environmentStore} = useStore();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl((event as any).currentTarget);
    };

    const handleSelect = (environmentId: string | number) => {
        environmentStore.setSelectedEnvironment(environmentId);
        handleClose();
    }

    const handleManage = () => {
        handleClose()
        history.push("/environments");
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                className={classes.button}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                {
                    environmentStore.selectedEnvironment
                        ? environmentStore.selectedEnvironment.name
                        : "No Environment"
                }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    environmentStore.environments.map((env: Environment) => (
                        <MenuItem key={env.id} onClick={() => handleSelect(env.id)}>
                            <ListItemIcon>
                                <ArrowRigthIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                {env.name}
                            </Typography>
                        </MenuItem>
                    ))
                }
                <Divider/>
                <MenuItem onClick={handleManage}>
                    <ListItemIcon>
                        <NewProjectIcon/>
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Manage Environments
                    </Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default observer(EnvironmentSelect);