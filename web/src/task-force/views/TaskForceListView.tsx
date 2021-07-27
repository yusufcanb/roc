import React, {FunctionComponent, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Add';

import {EmptyState, PageContent} from "core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import {useStore} from "core/store";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import TaskForceList from "../components/TaskForceList";


const useStyles = makeStyles((theme) => ({
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

const TaskForceListView: FunctionComponent = (props) => {
    const classes = useStyles();
    const {taskForceStore} = useStore();

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
                        title={"No Task Force Exists!"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
                        actionButton={<Button
                            variant={"outlined"}
                            onClick={() => null}
                            startIcon={<CreateIcon/>}>
                            Create New Factory
                        </Button>}
            />
        )
    }

    const renderContent = () => {
        return (
            <TaskForceList taskForces={taskForceStore.forces}/>
        )
    }

    if (taskForceStore.forces.length === 0 && !taskForceStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Factory</Button>}>
            {
                taskForceStore.isLoading && !taskForceStore.isErrored
                    ? renderLoadingState()
                    : taskForceStore.forces.length != 0
                    ? renderContent()
                    : renderEmptyState()
            }
        </PageContent>
    )
}


export default observer(TaskForceListView);