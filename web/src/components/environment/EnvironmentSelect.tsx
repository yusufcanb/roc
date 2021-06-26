import React, {FunctionComponent} from "react";
import {makeStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {ArrowDropDown, ArrowRight as ArrowRigthIcon, SettingsApplications as NewProjectIcon} from "@material-ui/icons";
import {Divider, ListItemIcon, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "transparent",
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px"
    },
    icon: {marginBottom: "2px"}
}));

const EnvironmentSelect: FunctionComponent = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl((event as any).currentTarget);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                className={classes.button}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                No Environment
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    ["No Environment"].map(p => (
                        <MenuItem key={p} onClick={handleClose}>
                            <ListItemIcon>
                                <ArrowRigthIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                {p}
                            </Typography>
                        </MenuItem>
                    ))
                }
                <Divider/>
                <MenuItem onClick={handleClose}>
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

export default EnvironmentSelect;