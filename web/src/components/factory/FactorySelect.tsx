import React, {FunctionComponent} from "react";
import {makeStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {ArrowDropDown} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "transparent",
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px"
    },
    icon: {marginBottom: "2px"}
}));

const FactorySelect: FunctionComponent = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color={"primary"}
                className={classes.button}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                Select Factory
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default FactorySelect;