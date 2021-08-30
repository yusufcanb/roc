import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {List} from "@material-ui/core";
import TaskForceListItem from "./TaskForceListItem";
import {TaskForce} from "../models/TaskForce";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listContainer: {}
    }),
);

interface TaskForceListProps {
    taskForces: Array<TaskForce>;
}

const TaskForceList: FunctionComponent<TaskForceListProps> = (props: PropsWithChildren<TaskForceListProps>) => {
    const classes = useStyles();
    const {taskForces} = props;

    return (
        <List className={classes.listContainer} title={"Task Forces"}>
            {taskForces.map(force => <TaskForceListItem key={force.id} taskForce={force}/>)}
        </List>
    )
}

export default TaskForceList;