import React, {FunctionComponent, PropsWithChildren} from "react";
import {List} from "@material-ui/core";
import {Project, ProjectModel} from "../models/Project";
import ProjectListItem from "./ProjectListItem";
import {observer} from "mobx-react-lite";


interface ProjectListProps {
    projects: Array<Project | ProjectModel>;
}

const ProjectList: FunctionComponent<ProjectListProps> = (props: PropsWithChildren<ProjectListProps>) => {
    const {projects} = props;

    return (
        <List title={"Projects"}>
            {projects.map(project => <ProjectListItem key={project.id} project={project}/>)}
        </List>)
}

export default observer(ProjectList);