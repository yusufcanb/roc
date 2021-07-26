import React, {FunctionComponent, useEffect} from "react";
import {
    Avatar,
    Button,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {EmptyState, PageContent} from "../../core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import CreateIcon from '@material-ui/icons/Add';
import {useStore} from "core/store";

import {makeStyles, Theme} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Delete, Edit} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        minHeight: "75px",
        marginBottom: 10,
        border: "2px solid #ebebeb",
        borderRadius: "10px",
        "&:hover": {
            cursor: "pointer",
            borderColor: theme.palette.primary.main
        }
    }
}));

const Factory: FunctionComponent = () => {
    const classes = useStyles();
    const {environmentStore} = useStore();

    useEffect(() => {
        environmentStore.fetchEnvironments();
    }, [environmentStore]);

    const handleCreate = () => null;

    const renderLoadingState = () => {
        return (
            <React.Fragment>
                {/*{[0, 1, 2, 3, 4, 5].map(i => (*/}
                {/*    <Skeleton key={i} className={classes.skeleton} animation="wave" variant={"rect"}/>*/}
                {/*))}*/}
            </React.Fragment>
        )
    }

    const renderEmptyState = () => {
        return (
            <EmptyState icon={BusinessIcon}
                        title={"No Environment Exists!"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
                        actionButton={<Button
                            variant={"outlined"}
                            onClick={handleCreate}
                            startIcon={<CreateIcon/>}>
                            Create New Factory
                        </Button>}
            />
        )
    }

    const renderContent = () => {
        return (
            <List title={"Environments"}>
                {environmentStore.environments.map(env => <ListItem className={classes.listItem}>
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
                </ListItem>)}
            </List>
        )
    }

    if (environmentStore.environments.length === 0 && !environmentStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent>
            {
                environmentStore.isLoading && !environmentStore.isErrored
                    ? renderLoadingState()
                    : environmentStore.environments.length != 0
                    ? renderContent()
                    : renderEmptyState()
            }
        </PageContent>
    )
}

export default observer(Factory);