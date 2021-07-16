import React, {FunctionComponent} from "react";
import {EmptyState} from "../components";
import {Box} from "@material-ui/core";
import WelcomeTourDialog from "../components/WelcomeTourDialog";
import PageContent from "../components/PageContent";

const Home: FunctionComponent = (props) => {

    return (
        <PageContent>
            <Box width={"100%"} height={"100%"}>
                <EmptyState title={"Let's Automate"}
                            subTitle={"Your assistant shows you fun new things automatically\n" +
                            "ceated from your photos and helps you to say organised"}
                            actionButton={<WelcomeTourDialog/>}
                />
            </Box>
        </PageContent>
    )
}

export default Home;