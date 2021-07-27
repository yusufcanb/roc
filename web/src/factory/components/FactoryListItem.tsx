import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Factory, FactoryModel} from "../models/Factory";
import OperatingSystemIcon from "./OperatingSystemIcon";
import {Delete, Edit} from "@material-ui/icons";
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
        }
    }),
);

interface FactoryListItemProps {
    factory: Factory | FactoryModel;
}

const FactoryListItem: FunctionComponent<FactoryListItemProps> = (props: PropsWithChildren<FactoryListItemProps>) => {
    const classes = useStyles();
    const {factory} = props;

    return (
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <OperatingSystemIcon os={factory.os}/>
            </ListItemAvatar>
            <ListItemText
                primary={factory.displayName}
                secondary={factory.os}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <Edit/>
                </IconButton>
                <DeleteButton edge="end" aria-label="delete">
                    <Delete/>
                </DeleteButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default FactoryListItem;