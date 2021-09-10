import React, {PropsWithChildren} from "react";
import {PageContent} from "../../core/components";
import {useHistory, useParams} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import EnvironmentKeyValueTable from "../components/EnvironmentKeyValueTable";
import {useStore} from "../../core/store";


const EnvironmentDetailView: React.FC = (props: PropsWithChildren<any>) => {
    let {environmentId} = useParams() as any;
    const {environmentStore} = useStore();
    const history = useHistory();

    const handleSave = () => {
        history.push("/environments");
    }

    const renderRight = () => (
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
        >
            <Grid item> <Button variant={"contained"}>Import CSV</Button> </Grid>
            <Grid item> <Button onClick={handleSave} variant={"contained"} color={"secondary"}>Save</Button> </Grid>
        </Grid>
    )

    return (
        <PageContent right={renderRight()}>
            <EnvironmentKeyValueTable/>
        </PageContent>
    )

}

export default EnvironmentDetailView;