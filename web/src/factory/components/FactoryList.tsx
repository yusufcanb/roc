import React, {FunctionComponent, PropsWithChildren} from "react";
import {List} from "@material-ui/core";
import {Factory, FactoryModel} from "../models/Factory";
import FactoryListItem from "./FactoryListItem";


interface FactoryListProps {
    factories: Array<Factory | FactoryModel>;
}

const FactoryList: FunctionComponent<FactoryListProps> = (props: PropsWithChildren<FactoryListProps>) => {
    const {factories} = props;

    return (<List title={"Environments"}>
        {factories.map(factory => <FactoryListItem factory={factory}/>)}
    </List>)
}

export default FactoryList;