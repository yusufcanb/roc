import React, {FunctionComponent} from "react";
import {Box} from "@material-ui/core";
import {EmptyState, PageContent, WelcomeTourDialog} from "core/components";

const Home: FunctionComponent = (props) => {
    return (
        <PageContent>
            <Box width={"100%"} height={"100%"}>
                <i className="fab fa-raspberry-pi" />
                <EmptyState title={"Let's Automate 🤖🕹"}
                            subTitle={"Welcome to Robot Operation Center (ROC), you can start a tour to overview the concepts and features"}
                            icon={() => (<img src={"logo-dark.png"} alt={"logo"} width={125}/>)}
                            actionButton={<WelcomeTourDialog/>}
                />
            </Box>
        </PageContent>
    )
}

export default Home;