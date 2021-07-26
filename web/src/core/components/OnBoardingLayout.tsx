import React, {FunctionComponent, PropsWithChildren, useEffect} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    image: {
        width: 50,
        fontSize: "10em",
        animation: "on-boarding 3s infinite alternate"
    },
    container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    },
    text: {
        color: "#fff"
    }
}));

interface OnBoardingLayoutProps {
}

const OnBoardingLayout: FunctionComponent<OnBoardingLayoutProps> = (props: PropsWithChildren<OnBoardingLayoutProps>) => {
    const classes = useStyles();

    useEffect(() => {
        document.body.className = "on-boarding";
    }, [])

    useEffect(() => {
        return () => {
            document.body.className = "";
        };
    }, []);

    return (
        <Box className={classes.container}>
            <img className={classes.image} src={"logo.png"} alt={"logo"}/>
            <Box marginTop={3}>
                <Typography className={classes.text} variant={"h5"}>Getting things ready...</Typography>
                <Typography className={classes.text} variant={"h5"}>Please wait...</Typography>
            </Box>
        </Box>
    )
}

export default OnBoardingLayout;