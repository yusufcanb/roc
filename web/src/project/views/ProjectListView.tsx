import React from 'react';
import PageContent from "../../core/components/PageContent";
import {useStore} from "../../core/store";
import {Button} from "@material-ui/core";
import ProjectList from "../components/ProjectList";


const ProjectListView = () => {
    const {projectStore} = useStore();

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Project</Button>}>
            <ProjectList projects={projectStore.projects}/>
        </PageContent>
    );
}

export default ProjectListView;