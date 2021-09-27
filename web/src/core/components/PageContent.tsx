import React, {FunctionComponent, PropsWithChildren} from "react";
import Breadcrumb from "./Breadcrumb";
import {observer} from "mobx-react-lite";
import {Box, Container, Grid, Snackbar} from "@material-ui/core";
import {useStore} from "core/store";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadcrumb: {},
        content: {},
        right: {
            textAlign: "right",
        }
    })
);

interface PageContentProps {
    right?: React.ReactElement
}

const PageContent: FunctionComponent<PageContentProps> = (props: PropsWithChildren<PageContentProps>) => {
    const classes = useStyles();
    const {uiStore} = useStore();

    const location = useLocation();

    React.useEffect(() => {
        uiStore.setBreadcrumbState(location.pathname);
    }, [uiStore, location.pathname]);

    return (
        <Container maxWidth="xl">
            <Box paddingX={2} paddingY={3} className={classes.breadcrumb}>
                <Grid container justify={"space-around"}>
                    <Grid item xs={8}>
                        <Breadcrumb state={uiStore.breadcrumb}/>
                    </Grid>
                    <Grid className={classes.right} item xs={4}>
                        {props.right}
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.content}>
                {props.children}
            </Box>
            {
                uiStore.snackBarContent
                    ? (<Snackbar
                        open={true}
                        onClose={() => null}
                        key={uiStore.snackBarContent?.text}>
                        <Alert onClose={() => null}>
                            {uiStore.snackBarContent?.text}
                        </Alert>
                    </Snackbar>) : null
            }
        </Container>
    );
}

export default observer(PageContent);