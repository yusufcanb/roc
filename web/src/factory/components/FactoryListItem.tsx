import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {Factory, FactoryModel} from "../models/Factory";
import OperatingSystemIcon from "./OperatingSystemIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            border: "2px solid #333",
            borderRadius: "4px",
            height: 75,
            marginBottom: 15,
            padding: 10,
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
                borderColor: theme.palette.secondary.main,
            }
        },
        icon: {
            padding: 10
        }
    }),
);

interface FactoryListItemProps {
    factory: Factory | FactoryModel;
}

const FactoryListItem: FunctionComponent<FactoryListItemProps> = (props: PropsWithChildren<FactoryListItemProps>) => {
    const classes = useStyles();

    return (
        <Grid justify={"center"} container className={classes.container} direction={"column"}>
            <Grid item>
                <OperatingSystemIcon os={props.factory.os}/>
            </Grid>
            <Grid item>
                {props.factory.name}
            </Grid>
            <Grid item>
                Online
            </Grid>
        </Grid>
    )
}

export default FactoryListItem;