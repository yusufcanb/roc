import React, {FunctionComponent, PropsWithChildren} from "react";
import {Box, List} from "@material-ui/core";
import {Environment} from "../models";
import EnvironmentListItem from "./EnvironmentListItem";


interface EnvironmentListProps {
    onUpdate: (environment: Environment) => any;
    onDelete: (environment: Environment) => any;
    environments: Array<Environment>;
}

const EnvironmentList: FunctionComponent<EnvironmentListProps> = (props: PropsWithChildren<EnvironmentListProps>) => {
    const {environments} = props;

    return (
        <List title={"Environments"}>
            {environments.map(env =>
                <Box key={env.id}>
                    <EnvironmentListItem onUpdate={() => props.onUpdate(env)}
                                         onDelete={() => props.onDelete(env)}
                                         env={env}/>
                </Box>
            )}
        </List>);
}

export default EnvironmentList;