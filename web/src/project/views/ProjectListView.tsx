import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";
import {useStore} from "../../core/store";
import {Button} from "@material-ui/core";
import ProjectList from "../components/ProjectList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {}
    })
);

const ProjectListView = () => {
    const classes = useStyles();
    const {projectStore} = useStore();

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Project</Button>}>
            <ProjectList projects={projectStore.projects}/>
        </PageContent>
    );
}

export default ProjectListView;