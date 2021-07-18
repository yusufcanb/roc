import React, {FunctionComponent} from "react";
import {Icon} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            padding: 10
        }
    }),
);

interface OperatingSystemIconProps {
    os: string;
}

const OperatingSystemIcon: FunctionComponent<OperatingSystemIconProps> = (props) => {
    const classes = useStyles();
    const osMap: any = {
        "windows": (<Icon className={`${classes.icon} fa fa-windows`}/>),
        "macos": (<Icon className={`${classes.icon} fa fa-apple`}/>),
        "linux": (<Icon className={`${classes.icon} fa fa-linux`}/>),
        "rpi": (<Icon className={`${classes.icon} fa fa-raspberry-pi`}/>)
    }

    return osMap[props.os]
}

export default OperatingSystemIcon;