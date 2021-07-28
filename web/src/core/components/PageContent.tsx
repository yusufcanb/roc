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
    const store = useStore();

    const location = useLocation();

    React.useEffect(() => {
        store.setBreadcrumbState(location.pathname);
    }, [store, location]);

    return (
        <Container maxWidth="xl">
            <Box paddingX={2} paddingY={3} className={classes.breadcrumb}>
                <Grid container justify={"space-around"}>
                    <Grid item xs={9}>
                        <Breadcrumb state={store.breadcrumb}/>
                    </Grid>
                    <Grid className={classes.right} item xs={3}>
                        {props.right}
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.content}>
                {props.children}
            </Box>
            {
                store.snackBarContent
                    ? (<Snackbar
                        open={true}
                        onClose={() => null}
                        key={store.snackBarContent?.text}>
                        <Alert onClose={() => null}>
                            {store.snackBarContent?.text}
                        </Alert>
                    </Snackbar>) : null
            }
        </Container>
    );
}

export default observer(PageContent);