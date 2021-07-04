import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Typography} from "@material-ui/core";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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

function handleClick(event: any) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

function SimpleBreadcrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
                ROC
            </Link>
            <Typography color="textPrimary">Settings</Typography>
        </Breadcrumbs>
    );
}

const Settings = () => {
    const classes = useStyles();

    return (
        <Box p={5} className={classes.container}>
            <Breadcrumb state={["ROC", "Settings"]}/>
            {/*<Box marginTop={5}>*/}
            {/*    {*/}
            {/*        [0, 1, 2, 3, 4].map(*/}
            {/*            () => <Paper className={classes.row} elevation={3}>Hello</Paper>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</Box>*/}
        </Box>
    );
}

export default Settings;