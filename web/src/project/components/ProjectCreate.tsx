import React, {FunctionComponent, PropsWithChildren, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import {slugify} from "../../core/utils/string";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            width: "100%"
        },
        textField: {
            width: "100%",
            minWidth: 250
        },
        input: {
            background: "#fff",
            "&:focus": {
                background: "#fff",
            }
        }
    }),
);

interface ProjectCreateProps {

}

const ProjectCreate: FunctionComponent<ProjectCreateProps> = (props: PropsWithChildren<ProjectCreateProps>) => {
    const classes = useStyles();

    const [name, setName] = useState<string>("");
    const variant: any = "filled";

    return <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
    >
        <Grid className={classes.item} item>
            <TextField className={classes.textField}
                       InputProps={{
                           className: classes.input,
                       }}
                       onChange={(e) => setName(e.target.value as any)}
                       variant={variant}
                       label="Project Name"
                       helperText="Project name should contain alphanumeric values."
            />
        </Grid>
        <Grid className={classes.item} item>
            <TextField
                disabled={true}
                className={classes.textField}
                InputProps={{
                    className: classes.input,
                }}
                value={name !== "" ? `git@roc-platform:/roc/${slugify(name)}.git` : ""}
                label="Robot Repository"
                helperText="Remote Robot repository will be accessable at default-robot.git"
                variant={variant}/>
        </Grid>
        <Grid className={classes.item} item>
            <TextField
                className={classes.textField}
                InputProps={{
                    className: classes.input,
                }}
                label="SSH Key"
                helperText="Enter your SSH Public key to be permitted to perform Git operations. (Push, pull, etc.)"
                variant={variant}/>
        </Grid>
        <Grid className={classes.item}>
        </Grid>
    </Grid>
}

export default ProjectCreate;