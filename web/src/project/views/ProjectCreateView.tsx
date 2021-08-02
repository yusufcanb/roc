import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";
import {Box, Button, Container, Typography} from "@material-ui/core";
import {Save} from "@material-ui/icons";
import {useStore} from "../../core/store";
import {useHistory} from "react-router-dom";
import ProjectCreate from "../components/ProjectCreate";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
    })
);


const ProjectCreateView = () => {
    const classes = useStyles();

    const store = useStore();
    const history = useHistory();

    const handleCreate = () => {
        // store.projectStore.createProject({name: name, files: []});
        history.push("/projects");
        store.openSnackBar("Project created successfully", "success");
    }

    return (
        <PageContent right={<Button onClick={handleCreate} startIcon={<Save/>} variant={"contained"}
                                    color={"secondary"}>Save</Button>}>
            <Container className={classes.container} maxWidth={"md"}>
                <Box marginBottom={3}>
                    <Typography align={"center"} variant={"h4"}>Create New Project</Typography>
                </Box>
                <ProjectCreate/>
            </Container>
        </PageContent>
    );
};

export default ProjectCreateView;