import React, {FunctionComponent, PropsWithChildren} from "react";
import {makeStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {ArrowDropDown, ArrowRight as ArrowRigthIcon, SettingsApplications as NewProjectIcon} from "@material-ui/icons";
import {Divider, ListItemIcon, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px"
    },
    icon: {marginBottom: "2px"}
}));

const ProjectSelect: FunctionComponent = (props: PropsWithChildren<any>) => {
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
                onClick={handleClick}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                Default Project
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    ["Default Project"].map(p => (
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
                        Manage Projects
                    </Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProjectSelect;