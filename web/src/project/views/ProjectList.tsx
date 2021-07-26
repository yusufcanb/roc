import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";
import {useStore} from "../../core/store";
import {ProjectListItem} from "../components";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {}
    })
);

const ProjectList = () => {
    const classes = useStyles();
    const {projectStore} = useStore();

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Project</Button>}>
            {
                projectStore.projects.map(project => <ProjectListItem project={project}/>)
            }
        </PageContent>
    );
}

export default ProjectList;