import React, {FunctionComponent, PropsWithChildren} from "react";
import {Grid, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statItem: {

            "&:hover": {
                cursor: "pointer",
                color: theme.palette.secondary.main
            }
        }
    }),
);

interface Stat {
    text: string;
    content: string;
}

interface QuickStatsProps {
    stats: Array<Stat>;
}

const GeneralInfo: FunctionComponent<QuickStatsProps> = (props: PropsWithChildren<QuickStatsProps>) => {
    const classes = useStyles();

    return (
        <Grid container alignContent={"center"} justify={"center"} spacing={5}>
            {props.stats.map((statics) => (
                <Grid className={classes.statItem} key={statics.text} item>
                    <Typography align={"center"} variant={"h3"}>{statics.content}</Typography>
                    <Typography variant={"body1"}>{statics.text}</Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default GeneralInfo;