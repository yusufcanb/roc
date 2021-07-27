import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {}
    })
);

const ProjectSettingsView = () => {
    const classes = useStyles();

    return (
        <PageContent>
            <span className={classes.container}>page content</span>
        </PageContent>
    );
}

export default ProjectSettingsView;