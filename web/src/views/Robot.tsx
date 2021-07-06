import React, {FunctionComponent} from "react";
import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(5, 10),
        },
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

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Typography variant={"h4"}>Quick setup — if you’ve done this kind of thing before</Typography>
                        <Grid container direction={"row"}>
                            <Grid item xs={10}>
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
                            <Grid item xs={2}></Grid>
                        </Grid>
                        <Typography variant={"body1"}>Get started by creating a new file or uploading an existing file.
                            We recommend every repository include a README, LICENSE, and .gitignore.</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={0} className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs>
                        <Typography variant={"h4"}>…or create a new repository on the command line</Typography>
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
                        <Typography variant={"h4"}>…or push an existing repository from the command line</Typography>
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
        </div>)
}

export default Robot;