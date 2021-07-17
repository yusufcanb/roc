import React, {FunctionComponent, PropsWithChildren} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";

import AndroidIcon from '@material-ui/icons/Android';

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

interface EmptyStateProps {
    icon?: any;
    title: string;
    subTitle?: string;
    actionButton?: React.ReactNode;
}

const EmptyState: FunctionComponent<EmptyStateProps> = (props: PropsWithChildren<EmptyStateProps>) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            {props.icon ? <props.icon className={classes.icon}/> : <AndroidIcon className={classes.icon}/>}
            <Typography className={classes.text} variant={"h4"}>{props.title}</Typography>
            <Typography className={classes.text}>{props.subTitle}</Typography>
            <Box marginTop={2}>
                {
                    props.actionButton ? props.actionButton : null
                }
            </Box>
            {props.children}
        </Box>
    )
}

export default EmptyState