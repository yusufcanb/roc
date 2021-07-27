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
    env: Environment;
}

const EnvironmentListItem: FunctionComponent<EnvironmentListItemProps> = (props: PropsWithChildren<EnvironmentListItemProps>) => {
    const classes = useStyles();
    const {env} = props;

    return <ListItem className={classes.listItem}>
        <ListItemAvatar>
            <Avatar>
                <Icon className={"fas fa-cubes"} color={"primary"}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={env.name}
            secondary={env.variables.length + " Variables"}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <Edit/>
            </IconButton>
            <IconButton edge="end" aria-label="delete">
                <Delete/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}

export default EnvironmentListItem;