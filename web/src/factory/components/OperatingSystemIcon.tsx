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
}

const OperatingSystemIcon: FunctionComponent<OperatingSystemIconProps> = (props: PropsWithChildren<OperatingSystemIconProps>) => {
    const classes = useStyles();
    const fontSize: any = props.fontSize ? props.fontSize : "default";
    const osMap: any = {
        "windows": (<Icon fontSize={fontSize} className={`${classes.icon} fab fa-windows`}/>),
        "macos": (<Icon fontSize={fontSize} className={`${classes.icon} fab fa-apple`}/>),
        "linux": (<Icon fontSize={fontSize} className={`${classes.icon} fab fa-linux`}/>),
        "rpi": (<Icon fontSize={fontSize} className={`${classes.icon} fab fa-raspberry-pi`}/>)
    }

    return osMap[props.os.toLowerCase()]
}

export default OperatingSystemIcon;