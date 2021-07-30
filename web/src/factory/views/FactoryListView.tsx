import React, {FunctionComponent, useEffect} from "react";
import {Button} from "@material-ui/core";
import {EmptyState, PageContent} from "../../core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import CreateIcon from '@material-ui/icons/Add';
import {useStore} from "core/store";
import {FactoryModel} from "../models/Factory";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {observer} from "mobx-react-lite";
import FactoryList from "../components/FactoryList";

const useStyles = makeStyles((theme) => ({
    listHeader: {
        textAlign: "left"
    },
    skeleton: {
        height: 75,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },
    listHeaderText: {
        width: 75,
        fontWeight: 700,
        fontSize: 15
    }
}));

const FactoryListView: FunctionComponent = () => {
    const classes = useStyles();
    const {factoryStore} = useStore();

    useEffect(() => {
        factoryStore.fetchFactories();
    }, [factoryStore]);

    const handleCreate = () => factoryStore.factories.push(new FactoryModel(0, "Yusuf's iMac", "macos"))
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
                        title={"No FactoryListView Exists!"}
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
            <FactoryList factories={factoryStore.factories}/>
        )
    }

    if (factoryStore.factories.length === 0 && !factoryStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Factory</Button>}>
            {
                factoryStore.isLoading && !factoryStore.isErrored
                    ? renderLoadingState()
                    : factoryStore.factories.length !== 0
                    ? renderContent()
                    : renderEmptyState()
            }
        </PageContent>
    )
}

export default observer(FactoryListView);