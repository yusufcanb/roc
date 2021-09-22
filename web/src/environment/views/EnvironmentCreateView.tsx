import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";
import {Box, Button, Container, Typography} from "@material-ui/core";
import {Save} from "@material-ui/icons";
import {useStore} from "../../core/store";
import {useHistory} from "react-router-dom";
import EnvironmentCreateForm from "../components/EnvironmentCreateForm";
import {Environment} from "../models";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
    })
);

const EnvironmentCreateView = () => {
    const classes = useStyles();
    const {environmentStore, uiStore} = useStore();

    const [form, setForm] = useState<Partial<Environment>>();
    const history = useHistory();

    const handleCreate = () => {
        history.push("/environments");
        environmentStore.createEnvironment(form as Environment);
        uiStore.openSnackBar("Environment created successfully", "success");
    }

    const handleFormUpdate = (obj: Partial<Environment>) => {
        setForm(obj);
    }

    return (
        <PageContent right={<Button onClick={handleCreate} startIcon={<Save/>} variant={"contained"}
                                    color={"secondary"}>Save</Button>}>
            <Container className={classes.container} maxWidth={"md"}>
                <Box marginBottom={3}>
                    <Typography align={"center"} variant={"h4"}>Create New Environment</Typography>
                </Box>
                <EnvironmentCreateForm onChange={handleFormUpdate}/>
            </Container>
        </PageContent>
    );
};

export default EnvironmentCreateView;