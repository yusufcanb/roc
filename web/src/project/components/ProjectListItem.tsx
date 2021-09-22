import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Project, ProjectModel} from "../models/Project";
import {Delete, Edit, VpnKeySharp} from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import {DeleteButton} from "../../core/components";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            minHeight: "75px",
            marginBottom: 10,
            border: "2px solid #ebebeb",
            borderRadius: "6px",
            "&:hover": {
                cursor: "pointer",
                borderColor: theme.palette.primary.main
            }
        },
    }),
);

interface ProjectListItemProps {
    project: Project | ProjectModel;
}

const ProjectListItem: FunctionComponent<ProjectListItemProps> = (props: PropsWithChildren<ProjectListItemProps>) => {
    const classes = useStyles();
    const {project} = props;

    return <ListItem className={classes.listItem}>
        <ListItemAvatar>
            <Avatar variant={"rounded"}>
                <CodeIcon fontSize={"large"} color={"primary"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={project.name}
            secondary={project.files.length + " Robots"}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <VpnKeySharp/>
            </IconButton>
            <IconButton edge="end" aria-label="delete">
                <Edit/>
            </IconButton>
            <DeleteButton edge="end" aria-label="delete">
                <Delete/>
            </DeleteButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default ProjectListItem;