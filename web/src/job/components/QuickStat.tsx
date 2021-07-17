import React, {FunctionComponent, PropsWithChildren} from "react";
import {Grid, Typography} from "@material-ui/core";

interface QuickStatProps {
    text: string;
    content: string;
}

const QuickStat: FunctionComponent<QuickStatProps> = (props: PropsWithChildren<QuickStatProps>) => {
    return (
        <Grid item>
            <Typography align={"center"} variant={"h3"}>{props.content}</Typography>
            <Typography variant={"body1"}>{props.text}</Typography>
        </Grid>
    );
}

export default QuickStat;