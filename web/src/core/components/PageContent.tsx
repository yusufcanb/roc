import React, {FunctionComponent} from "react";
import Breadcrumb from "./Breadcrumb";
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {useStore} from "core/store";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadcrumb: {},
        content: {}
    })
);

const PageContent: FunctionComponent = (props) => {
    const classes = useStyles();
    const store = useStore();

    const location = useLocation();

    React.useEffect(() => {
        store.setWindowLocation(["ROC", window.location.pathname.replace("/", "")]);
    }, [location]);

    return (
        <Container maxWidth="xl">
            <Box paddingX={2} paddingY={3} className={classes.breadcrumb}>
                <Breadcrumb state={store.windowLocation}/>
            </Box>
            <Box className={classes.content}>
                {props.children}
            </Box>
        </Container>
    );
}

export default observer(PageContent);