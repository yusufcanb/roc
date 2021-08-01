import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PageContent from "../../core/components/PageContent";
import {Button, Container, Grid, MenuItem, Select, TextField} from "@material-ui/core";
import {Save} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
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
    })
);

export const slugify = (...args: (string | number)[]): string => {
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}

const ProjectCreateView = () => {
    const classes = useStyles();
    const [name, setName] = useState<string>("");
    const variant: any = "filled";

    return (
        <PageContent right={<Button startIcon={<Save/>} variant={"contained"} color={"secondary"}>Save</Button>}>
            <Container maxWidth={"md"}>
                <Grid
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
                            value={name != "" ? `git@roc-platform:/roc/${slugify(name)}` : ""}
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

            </Container>
        </PageContent>
    );
};

export default ProjectCreateView;