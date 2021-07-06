import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";

import Breadcrumb from "../components/Breadcrumb";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
        heading: {
            fontWeight: 500
        },
        row: {
            marginTop: 50,
            minHeight: "75px",
            width: "100%"
        }
    })
);


const Settings = () => {
    const classes = useStyles();

    return (
        <Box p={5} className={classes.container}>
            <Breadcrumb state={["ROC", "Settings"]}/>
        </Box>
    );
}

export default Settings;