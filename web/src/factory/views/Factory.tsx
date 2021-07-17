import React, {FunctionComponent, useEffect} from "react";
import {Box, Button} from "@material-ui/core";
import {EmptyState, LoadingState, PageContent} from "../../core/components";

import BusinessIcon from "@material-ui/icons/HomeWork";
import CreateIcon from '@material-ui/icons/Add';
import {useStore} from "core/store";
import {observer} from "mobx-react-lite";
import {FactoryModel} from "../models/Factory";
import {FactoryListItem} from "../components";

const Factory: FunctionComponent = () => {
    const {factoryStore} = useStore();

    useEffect(() => {
        factoryStore.fetchFactories();
    }, [factoryStore]);

    const handleCreate = () => factoryStore.factories.push(new FactoryModel(0, "Windows 10", "macos"))
    const renderLoadingState = () => {
        return (<LoadingState/>)
    }

    const renderEmptyState = () => {
        return (
            <Box width={"100%"} height={"100%"}>
                <EmptyState icon={BusinessIcon}
                            title={"No Factory Exists!"}
                            subTitle={"Your assistant shows you fun new things automatically\n" +
                            "ceated from your photos and helps you to say organised"}
                            actionButton={<Button
                                variant={"outlined"}
                                onClick={handleCreate}
                                startIcon={<CreateIcon/>}>
                                Create New Factory
                            </Button>}
                />
            </Box>
        )
    }

    const renderContent = () => {
        return factoryStore.factories.map(factory => (<FactoryListItem factory={factory}/>))
    }

    if (factoryStore.factories.length === 0 && !factoryStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent>
            {
                factoryStore.isLoading && !factoryStore.isErrored
                    ? renderLoadingState()
                    : renderContent()
            }
        </PageContent>
    )
}

export default observer(Factory);