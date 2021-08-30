import React, {FunctionComponent, PropsWithChildren} from "react";
import {List} from "@material-ui/core";
import {Environment} from "../models";
import EnvironmentListItem from "./EnvironmentListItem";


interface EnvironmentListProps {
    environments: Array<Environment>;
}

const EnvironmentList: FunctionComponent<EnvironmentListProps> = (props: PropsWithChildren<EnvironmentListProps>) => {
    const {environments} = props;

    return (
        <List title={"Environments"}>
            {environments.map(env => <EnvironmentListItem key={env.id} env={env}/>)}
        </List>)
}

export default EnvironmentList;