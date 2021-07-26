import React, {FunctionComponent} from "react";
import {makeStyles} from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {ArrowDropDown} from "@material-ui/icons";
import {observer} from "mobx-react-lite";
import {useStore} from "core/store";
import OperatingSystemIcon from "./OperatingSystemIcon";
import {FactoryModel} from "../models/Factory";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "transparent",
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px",
        minWidth: "150px"
    },
    icon: {marginBottom: "2px"}
}));

const FactorySelect: FunctionComponent = (props) => {
    const classes = useStyles();
    const {factoryStore} = useStore();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl((event as any).currentTarget);
    };

    const handleSelect = (factory: FactoryModel) => {
        setAnchorEl(null);
        factoryStore.setSelectedFactory(factory.id);
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color={"primary"}
                className={classes.button}
                onClick={handleClick}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                {factoryStore.selectedFactory ? factoryStore.selectedFactory.displayName : "Select Factory"}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    factoryStore.factories.map(factory => (
                        <MenuItem key={factory.id} onClick={() => handleSelect(factory)}><OperatingSystemIcon
                            os={factory.os}/>{factory.displayName}
                        </MenuItem>))
                }
            </Menu>
        </React.Fragment>
    )
}

export default observer(FactorySelect);