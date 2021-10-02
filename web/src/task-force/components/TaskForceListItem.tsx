import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";

import {AccountTree, PlayArrow, Restore, Schedule} from "@material-ui/icons";
import {useStore} from "../../core/store";
import {useHistory} from "react-router-dom";

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
    const history = useHistory();

    const {taskForce} = props;
    const {uiStore} = useStore();

    const handleExecute = () => {
        uiStore.openSnackBar("Task executed", "success");
    }

    return <ListItem className={classes.listItem} onClick={() => history.push("/task-force/" + taskForce.id)}>
        <ListItemAvatar>
            <Avatar variant={"rounded"} color={"primary"}>
                <AccountTree color={"primary"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={taskForce.name}
            secondary={taskForce.robots}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="schedule">
                <Restore/>
            </IconButton>

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