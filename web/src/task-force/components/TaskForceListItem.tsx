import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";

import {AccountTree, PlayArrow, Schedule} from "@material-ui/icons";
import {useStore} from "../../core/store";

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
    const store = useStore();

    const handleExecute = () => {
        store.openSnackBar("Task executed", "success");
    }

    return <ListItem className={classes.listItem}>
        <ListItemAvatar>
            <Avatar color={"primary"}>
                <AccountTree color={"primary"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={taskForce.name}
            secondary={taskForce.robots}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="schedule">
                <Schedule/>
            </IconButton>
            <IconButton onClick={() => handleExecute()} edge="end" aria-label="execute">
                <PlayArrow/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default TaskForceListItem;