import React, {FunctionComponent, PropsWithChildren, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PageContent from "../../core/components/PageContent";
import {Box, Button, Container, Typography} from "@material-ui/core";
import {Save} from "@material-ui/icons";
import TaskForceCreate from "../components/TaskForceCreate";
import {useStore} from "../../core/store";
import {TaskForce, TaskForceModel} from "../models/TaskForce";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {}
    }),
);

interface TaskForceCreateViewProps {

}

const TaskForceCreateView: FunctionComponent<TaskForceCreateViewProps> = (props: PropsWithChildren<TaskForceCreateViewProps>) => {
    const classes = useStyles();
    const history = useHistory();

    const {taskForceStore} = useStore();
    const [form, setForm] = useState({});

    const handleCreate = () => {
        taskForceStore.createTaskForce(form as TaskForce);
        history.push("/task-force");
    }

    return <PageContent right={<Button onClick={handleCreate} startIcon={<Save/>} variant={"contained"}
                                       color={"secondary"}>Save</Button>}>
        <Container className={classes.container} maxWidth={"md"}>
            <Box marginBottom={3}>
                <Typography align={"center"} variant={"h4"}>Create New Task Force</Typography>
            </Box>
            <TaskForceCreate onChange={(obj) => setForm(obj)}/>
        </Container>
    </PageContent>
}

export default TaskForceCreateView;