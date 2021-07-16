import React, {FunctionComponent, PropsWithChildren} from "react";
import {Box, CircularProgress, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: "10em"
    },
    container: {
        width: "35em",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    },
    button: {
        marginTop: "25px"
    },
    text: {
        color: "#333"
    }
}));

interface LoadingStateProps {
}

const LoadingState: FunctionComponent<LoadingStateProps> = (props: PropsWithChildren<LoadingStateProps>) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <CircularProgress  thickness={2}/>
            <Box marginTop={3}>
                <Typography className={classes.text} variant={"body1"}>Loading...</Typography>
            </Box>
        </Box>
    )
}

export default LoadingState;