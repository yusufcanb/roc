import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";

import {HomeWork, PlayArrow, Schedule} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            minHeight: "75px",
            marginBottom: 10,
            border: "2px solid #ebebeb",
            borderRadius: "6px",
            "&:hover": {
                cursor: "pointer",
                borderColor: theme.palette.primary.main
            }
        }
    }),
);

interface TaskForceListItemProps {
    taskForce: any;
}

const TaskForceListItem: FunctionComponent<TaskForceListItemProps> = (props: PropsWithChildren<TaskForceListItemProps>) => {
    const classes = useStyles();
    const {taskForce} = props;

    return <ListItem className={classes.listItem}>
        <ListItemAvatar>
            <Avatar color={"primary"}>
                <HomeWork color={"inherit"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={taskForce.name}
            secondary={taskForce.robots}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <Schedule fontSize={"large"} />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
                <PlayArrow fontSize={"large"}/>
            </IconButton>

        </ListItemSecondaryAction>
    </ListItem>
}

export default TaskForceListItem;