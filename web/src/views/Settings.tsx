import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
    })
);

const Settings = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}></Box>
    );
}

export default Settings;