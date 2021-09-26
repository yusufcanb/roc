import React, {FunctionComponent, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "@material-ui/core";

import {EmptyState, PageContent} from "core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import {useStore} from "core/store";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";

import TaskForceList from "../components/TaskForceList";
import {Add} from "@material-ui/icons";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(() => ({
    listHeader: {
        textAlign: "left"
    },
    skeleton: {
        height: 75,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },
    listHeaderText: {
        width: 75,
        fontWeight: 700,
        fontSize: 15
    }
}));

const TaskForceListView: FunctionComponent = () => {
    const classes = useStyles();
    const {taskForceStore} = useStore();
    const history = useHistory();

    useEffect(() => {
        taskForceStore.fetchTaskForces();
    }, [taskForceStore]);

    const renderLoadingState = () => {
        return (
            <React.Fragment>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className={classes.skeleton} animation="wave" variant={"rect"}/>
                ))}
            </React.Fragment>
        )
    }

    const renderEmptyState = () => {
        return (
            <EmptyState icon={BusinessIcon}
                        title={"No Task Force"}
                        subTitle={"Task forces are collection of robots with a name and additional execution arguments."}
                        actionButton={<Button
                            variant={"outlined"}
                            onClick={() => history.push("/task-force/new")}
                            startIcon={<Add/>}>
                            New Task Force
                        </Button>}
            />
        )
    }

    const renderContent = () => {
        return (
            <React.Fragment>
                <TaskForceList taskForces={taskForceStore.forces}/>
            </React.Fragment>
        )
    }

    if (taskForceStore.forces.length === 0 && !taskForceStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent
            right={<Button onClick={() => history.push("/task-force/new")} startIcon={<Add/>} variant={"contained"}
                           color={"secondary"}>Create Task Force</Button>}>
            {
                taskForceStore.isLoading && !taskForceStore.isErrored
                    ? renderLoadingState()
                    : taskForceStore.forces.length !== 0
                    ? renderContent()
                    : renderEmptyState()
            }
        </PageContent>
    )
}

export default observer(TaskForceListView);