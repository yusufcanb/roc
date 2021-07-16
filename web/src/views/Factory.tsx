import React, {FunctionComponent} from "react";
import {EmptyState} from "../components";
import {Box, Button} from "@material-ui/core";

import BusinessIcon from "@material-ui/icons/HomeWork";
import CreateIcon from '@material-ui/icons/Add';
import PageContent from "../components/PageContent";

const Factory: FunctionComponent = (props) => {

    const handleCreate = () => console.log("Factory::create");
    const actionButton = (
        <Button
            variant={"outlined"}
            onClick={handleCreate}
            startIcon={<CreateIcon/>}>
            Create New Factory
        </Button>
    );

    return (
        <PageContent>
            <Box width={"100%"} height={"100%"}>
                <EmptyState icon={BusinessIcon}
                            title={"No Factory Exists!"}
                            subTitle={"Your assistant shows you fun new things automatically\n" +
                            "ceated from your photos and helps you to say organised"}
                            actionButton={actionButton}
                />
            </Box>
        </PageContent>
    )
}

export default Factory;