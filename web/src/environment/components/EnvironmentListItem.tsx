import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Avatar,
    Icon,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import {Environment} from "../models";
import {Link} from "react-router-dom";

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

interface EnvironmentListItemProps {
    onUpdate: (environment: Environment) => any;
    onDelete: (environment: Environment) => any;
    env: Environment;
}

const EnvironmentListItem: FunctionComponent<EnvironmentListItemProps> = (props: PropsWithChildren<EnvironmentListItemProps>) => {
    const classes = useStyles();
    const {onDelete, onUpdate} = props;
    const {env} = props;

    return <ListItem className={classes.listItem} component={Link} to={"/environments/" + env.id}>
        <ListItemAvatar>
            <Avatar variant={"rounded"} color={"secondary"}>
                <Icon className={"fas fa-cubes"} color={"primary"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={env.name}
            secondary={env.variables.length + " Variables"}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => onUpdate(env)}>
                <Edit/>
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(env)}>
                <Delete/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default EnvironmentListItem;