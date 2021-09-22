import React, {ChangeEvent, FunctionComponent, PropsWithChildren, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import {Environment, Variable} from "../models";

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

interface EnvironmentCreateFormProps {
    onChange: (obj: Partial<Environment>) => any;
}

const EnvironmentCreateForm: FunctionComponent<EnvironmentCreateFormProps> = (props: PropsWithChildren<EnvironmentCreateFormProps>) => {
    const classes = useStyles();
    const {onChange} = props;

    const [, setName] = useState<string>("");
    const [variables, ] = useState<Array<Variable>>([]);
    const variant: any = "filled";

    const handleNameChange = (name: string) => {
        setName(name);
        onChange(new Environment(name, variables));
    }


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
                       onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleNameChange(e.target.value as any)}
                       variant={variant}
                       label="Environment Name"
                       helperText="Specify a environment name. E.g. Development, Production, Staging"
            />
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

export default EnvironmentCreateForm;