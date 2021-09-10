import React, {FunctionComponent, useEffect} from "react";
import {Button} from "@material-ui/core";
import {EmptyState, PageContent} from "../../core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import CreateIcon from '@material-ui/icons/Add';
import {useStore} from "core/store";

import {makeStyles, Theme} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Skeleton} from "@material-ui/lab";
import EnvironmentList from "../components/EnvironmentList";
import {Environment} from "../models";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
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
    skeleton: {
        height: 75,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    }
}));

const Factory: FunctionComponent = () => {
    const classes = useStyles();
    const {environmentStore} = useStore();
    const history = useHistory();

    useEffect(() => {
        environmentStore.fetchEnvironments();
    }, [environmentStore]);

    const handleCreate = () => null;

    const handleUpdate = (environment: Environment) => {
        environmentStore.saveEnvironment(environment);
    }

    const handleDelete = (environment: Environment) => {
        environmentStore.deleteEnvironment(environment.id);
    }

    const renderLoadingState = () => {
        return (
            <React.Fragment>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className={classes.skeleton} animation="wave" variant={"rect"}/>
                ))}
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
        return <EnvironmentList onUpdate={handleUpdate} onDelete={handleDelete}
                                environments={environmentStore.environments}/>
    }

    if (environmentStore.environments.length === 0 && !environmentStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent
            right={<Button onClick={() => history.push("/environments/new")} variant={"contained"} color={"secondary"}>Create
                Environment</Button>}>
            {
                environmentStore.isLoading && !environmentStore.isErrored
                    ? renderLoadingState()
                    : environmentStore.environments.length !== 0
                    ? renderContent()
                    : renderEmptyState()
            }
        </PageContent>
    )
}

export default observer(Factory);