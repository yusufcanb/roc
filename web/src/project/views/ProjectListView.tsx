import React, {FunctionComponent} from 'react';
import PageContent from "../../core/components/PageContent";
import {useStore} from "../../core/store";
import {Button} from "@material-ui/core";
import ProjectList from "../components/ProjectList";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";


const ProjectListView: FunctionComponent = () => {
    const {projectStore} = useStore();
    const history = useHistory();

    return (
        <PageContent
            right={<Button onClick={() => history.push("/projects/new")} startIcon={<Add/>} variant={"contained"}
                           color={"secondary"}>Create
                Project</Button>}>
            <ProjectList projects={projectStore.projects}/>
        </PageContent>
    );
}

export default ProjectListView;