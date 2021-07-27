import React, {FunctionComponent, PropsWithChildren} from "react";
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
    fontSize?: string;
    color?: string;
}

const OperatingSystemIcon: FunctionComponent<OperatingSystemIconProps> = (props: PropsWithChildren<OperatingSystemIconProps>) => {
    const classes = useStyles();
    const fontSize: any = props.fontSize ? props.fontSize : "large";
    const color: any = props.color ?  props.color : "primary";
    const osMap: any = {
        "windows": (<Icon color={color} fontSize={fontSize} className={`${classes.icon} fab fa-windows`}/>),
        "macos": (<Icon color={color} fontSize={fontSize} className={`${classes.icon} fab fa-apple`}/>),
        "linux": (<Icon color={color} fontSize={fontSize} className={`${classes.icon} fab fa-linux`}/>),
        "rpi": (<Icon color={color} fontSize={fontSize} className={`${classes.icon} fab fa-raspberry-pi`}/>)
    }

    return osMap[props.os.toLowerCase()]
}

export default OperatingSystemIcon;