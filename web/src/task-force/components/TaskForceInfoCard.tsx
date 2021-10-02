import React, {FunctionComponent, PropsWithChildren} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Avatar, CardHeader} from "@material-ui/core";
import {AccountTree} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: "100%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 12
    },
    pos: {
        marginBottom: 12,
    },
    taskName: {
        marginTop: 20
    }
});

interface TaskForceInfoCardProps {
    name: string;
    description?: string;
}

const TaskForceInfoCard: FunctionComponent<TaskForceInfoCardProps> = (props: PropsWithChildren<TaskForceInfoCardProps>) => {
    const classes = useStyles();
    const robots = [];

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Task Force Information
                </Typography>
                <Typography className={classes.taskName} variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {robots.length} assigned robots.
                </Typography>
                <Typography variant="body2" component="p">
                    {props.description ?? "No description available for this task force."}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TaskForceInfoCard;