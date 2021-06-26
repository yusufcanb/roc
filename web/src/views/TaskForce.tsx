import React, {FunctionComponent} from "react";
import {EmptyState} from "../components";
import {Box, Button} from "@material-ui/core";

import BusinessIcon from "@material-ui/icons/AccountTree";
import CreateIcon from '@material-ui/icons/Add';

const TaskForce: FunctionComponent = (props) => {

    const handleCreate = () => console.log("TaskForce::create");
    const actionButton = (
        <Button
            variant={"outlined"}
            onClick={handleCreate}
            startIcon={<CreateIcon/>}>
            Create New Task Force
        </Button>
    );

    return (
        <Box width={"100%"} height={"100%"}>
            <EmptyState icon={BusinessIcon}
                        title={"No TaskForce Exists!"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
                        actionButton={actionButton}
            />
        </Box>
    )
}

export default TaskForce;