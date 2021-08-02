import React, {FunctionComponent, PropsWithChildren, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import RobotTransferList from "./RobotTransferList";

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
        },
        dialogContainer: {
            background: "#ebebeb"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

interface TaskForceCreateProps {

}

const TaskForceCreate: FunctionComponent<TaskForceCreateProps> = (props: PropsWithChildren<TaskForceCreateProps>) => {
    const classes = useStyles();

    const [name, setName] = useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState<number | string>('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                       label="Task Force Name"
                       placeholder="e.g. Daily Routine Operations"
                       helperText="Task Force name should contain alphanumeric values."
            />
        </Grid>
        <Grid className={classes.item} item>
            <TextField className={classes.textField}
                       InputProps={{
                           className: classes.input,
                       }}
                       onChange={(e) => setName(e.target.value as any)}
                       variant={variant}
                       label="CLI Args (Optional)"
                       placeholder={"--rpa --exit-on-fail"}
                       helperText="Specify execution args that will be used with robot execution."
            />
        </Grid>
        <Grid className={classes.item} item>
            <Button variant={variant} size={"large"} className={classes.textField} onClick={handleClickOpen}>Select
                Robots</Button>
            <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth={true}>
                <DialogTitle>Assign Robots</DialogTitle>
                <DialogContent className={classes.dialogContainer}>
                    <RobotTransferList/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    </Grid>
}

export default TaskForceCreate;