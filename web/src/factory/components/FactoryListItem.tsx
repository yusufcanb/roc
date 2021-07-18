import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, IconButton, Typography} from "@material-ui/core";
import {Factory, FactoryModel} from "../models/Factory";
import OperatingSystemIcon from "./OperatingSystemIcon";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            border: "2px solid " + theme.palette.primary.contrastText,
            borderRadius: "4px",
            height: 75,
            marginBottom: 15,
            padding: 10,
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
                borderColor: theme.palette.primary.main,
            }
        },
        icon: {
            padding: 10
        },
        text: {
            textAlign: "left",
            fontWeight: 500,
            width: "250px"
        },
    }),
);

interface FactoryListItemProps {
    factory: Factory | FactoryModel;
}

const FactoryListItem: FunctionComponent<FactoryListItemProps> = (props: PropsWithChildren<FactoryListItemProps>) => {
    const classes = useStyles();

    return (
        <Grid alignItems={"center"} justify={"space-between"} container className={classes.container} direction={"row"}>
            <Grid item>
                <OperatingSystemIcon fontSize={"large"} os={props.factory.os}/>
            </Grid>
            <Grid item>
                <Typography className={classes.text}>{props.factory.name}</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.text}>Online</Typography>
            </Grid>
            <Grid item>
                <IconButton color={"primary"}>
                    <MoreHorizIcon fontSize={"large"}/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default FactoryListItem;