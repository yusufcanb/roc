import React, {FunctionComponent} from "react";
import {EmptyState} from "../components";
import {Box} from "@material-ui/core";

import Icon from "@material-ui/icons/AccountTree";

const Jobs: FunctionComponent = (props) => {

    const handleCreate = () => console.log("Factory::create");

    return (
        <Box width={"100%"} height={"100%"}>
            <EmptyState icon={Icon}
                        title={"No Jobs Found"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
            />
        </Box>
    )
}

export default Jobs;