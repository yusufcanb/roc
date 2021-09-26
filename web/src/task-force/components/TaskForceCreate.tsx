import React, {ChangeEvent, FunctionComponent, PropsWithChildren, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import RobotTransferList from "./RobotTransferList";
import {ImportExport} from "@material-ui/icons";

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
        robotSelectButton: {
            height: "calc(100% - 22px)",
            float: "right"
        }
    }),
);

interface TaskForceCreateProps {

}

const TaskForceCreate: FunctionComponent<TaskForceCreateProps> = (props: PropsWithChildren<TaskForceCreateProps>) => {
    const variant: any = "filled";
    const classes = useStyles();

    const [, setName] = useState<string>("");
    const [open, setOpen] = React.useState(false);

    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                       onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setName(e.target.value as any)}
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
            <Grid container justify={"space-between"}>
                <Grid item md={10}>
                    <TextField className={classes.textField}
                               disabled={true}
                               variant={variant}
                               label="Assigned Robots"
                               helperText="Assign project's robots to this task force."
                    />
                </Grid>
                <Grid item md={1}>
                    <Button startIcon={<ImportExport/>} className={classes.robotSelectButton} color={"primary"}
                            variant={"outlined"}
                            onClick={handleClickOpen}>
                        Select
                    </Button>
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
        </Grid>

    </Grid>
}

export default TaskForceCreate;