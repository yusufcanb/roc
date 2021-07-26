import React, {FunctionComponent} from "react";
import {observer} from "mobx-react-lite";
import {Box, Button} from "@material-ui/core";

import BusinessIcon from "@material-ui/icons/AccountTree";
import CreateIcon from '@material-ui/icons/Add';

import {EmptyState, PageContent} from "core/components";
import {useStore} from "core/store";

const TaskForce: FunctionComponent = (props) => {

    const {taskForceStore} = useStore();

    const handleCreate = () => {
        taskForceStore.forces.push("Hello");
    }

    const actionButton = (
        <Button
            variant={"outlined"}
            onClick={handleCreate}
            startIcon={<CreateIcon/>}>
            Create Task Force
        </Button>
    );

    return (
        <PageContent right={<Button variant={"contained"} color={"secondary"}>Create Task Force</Button>}>
            <Box width={"100%"} height={"100%"}>
                <EmptyState icon={BusinessIcon}
                            title={"No TaskForce Exists!"}
                            subTitle={"Your assistant shows you fun new things automatically\n" +
                            "ceated from your photos and helps you to say organised"}
                            actionButton={actionButton}
                />
            </Box>
        </PageContent>
    )
}

export default observer(TaskForce);