import React, {FunctionComponent, PropsWithChildren} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {Grid, Typography} from "@material-ui/core";
import {Schedule} from "@material-ui/icons";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            height: "100%"
        },
        container: {
            width: "100%",
        },
        item: {
            // width: "100%"
        },
        icon: {
            fontSize: "45px"
        },
        title: {
            fontSize: 12,
        },
    }),
);

const TaskForceControl = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Task Control
                </Typography>
                <Grid container
                      direction={"column"}
                      className={classes.container}
                      alignItems={"center"}
                      justify={"center"}>
                    <Grid item className={classes.item}>
                        <IconButton>
                            <Schedule color={"action"} className={classes.icon}/>
                        </IconButton>
                        <Typography align={"center"} variant={"body1"}>Schedule</Typography>
                    </Grid>
                    <Grid item className={classes.item}>
                        <IconButton>
                            <PlayArrowIcon color={"secondary"} className={classes.icon}/>
                        </IconButton>
                        <Typography align={"center"} variant={"body1"}>Execute</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default TaskForceControl;