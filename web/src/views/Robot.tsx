import React, {FunctionComponent, PropsWithChildren} from "react";
import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PageContent from "../components/PageContent";
import ProjectDirectoryNavigation from "../components/ProjectDirectoryNavigation";

import {observer} from "mobx-react-lite";
import {useStore} from "../store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            maxWidth: "60%",
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
            border: "1px solid #333"
        },
        pre: {
            fontFamily: "monospace",
            background: "rgb(246, 248, 250)",
            padding: "10px"
        },
        textField: {
            width: "100%",
            background: "rgb(246, 248, 250)",
            margin: "20px 0px",
            "& input": {
                fontFamily: "monospace"
            }
        }
    }),
);

const Robot: FunctionComponent = (props) => {
    const classes = useStyles();
    const store = useStore();

    const renderEmptyState: FunctionComponent = (props: PropsWithChildren<any>) => {
        return (
            <React.Fragment>

                <Paper elevation={0} className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant={"h5"}>Quick setup — if you’ve done this kind of thing
                                before</Typography>
                            <Grid container direction={"row"}>
                                <Grid item xs={11}>
                                    <TextField
                                        id="standard-read-only-input"
                                        className={classes.textField}
                                        size={"small"}
                                        variant={"outlined"}
                                        defaultValue={`git@${window.location.host}:roc/default.git`}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                            <Typography variant={"body1"}>Get started by creating a new file or uploading an existing
                                file.
                                We recommend every repository include a README, LICENSE, and .gitignore.</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <Typography variant={"h5"}>…or create a new repository on the command line</Typography>
                            <code>
                            <pre className={classes.pre}>
                        {`
echo "# demo-automation-project" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:yusufcanb/demo-automation-project.git
git push -u origin master
                        `}
                            </pre>
                            </code>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <Typography variant={"h5"}>…or push an existing repository from the command
                                line</Typography>
                            <code>
                            <pre className={classes.pre}>
                        {`
echo "# demo-automation-project" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:yusufcanb/demo-automation-project.git
git push -u origin master
                        `}
                            </pre>
                            </code>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }

    return (
        <PageContent>
            <ProjectDirectoryNavigation/>
        </PageContent>)
}

export default observer(Robot);
