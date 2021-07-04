import React, {FunctionComponent, PropsWithChildren} from "react";
import {EmptyState} from "../components";
import {Box, Button} from "@material-ui/core";

import Icon from "@material-ui/icons/AccountTree";
import ArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const Jobs: FunctionComponent = (props: PropsWithChildren<any>) => {
    const actionButton = (
        <Button
            variant={"outlined"}
            startIcon={<ArrowRightIcon/>}>
            Go to Task Force
        </Button>
    );

    return (
        <Box width={"100%"} height={"100%"}>
            <EmptyState icon={Icon}
                        title={"No Jobs Found"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
                        actionButton={actionButton}
            />
        </Box>
    )
}

export default Jobs;