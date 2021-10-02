import React, {FunctionComponent} from "react";
import {Button, Card, Grid, Tab, Tabs} from "@material-ui/core";
import {PageContent} from "core/components";
import TaskForceInfoCard from "../components/TaskForceInfoCard";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TaskForceStatsCard from "../components/TaskForceStatsCard";
import TaskForceControl from "../components/TaskForceControl";
import TabPanel from "../../core/components/TabPanel";
import TaskExecutionHistoryTable from "../components/TaskExecutionHistoryTable";
import {Edit} from "@material-ui/icons";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%",
            minHeight: 200,
            marginBottom: 10
        },
        item: {
            minHeight: 200
        }
    }),
);

const TaskForceDetailView: FunctionComponent = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = React.useState(1);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    // @ts-ignore
    return (
        <PageContent
            right={<Button color={"secondary"} variant={"contained"} startIcon={<Edit/>}>Edit</Button>}>
            <Grid container className={classes.container} justify={"space-between"} spacing={2}>
                <Grid item xs={2} className={classes.item}>
                    <TaskForceInfoCard name={"Daily Health Check Operations"}/>
                </Grid>
                <Grid item xs={8} className={classes.item}>
                    <TaskForceStatsCard name={"Task Force Stats"}/>
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <TaskForceControl/>
                </Grid>
            </Grid>
            <Grid container className={classes.container} alignItems={"flex-start"} justify={"space-between"}>
                <Grid item xs={12}>
                    <Card>
                        <Tabs
                            value={activeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTabChange}
                        >
                            <Tab disabled label="Workflow"/>
                            <Tab label="History"/>
                        </Tabs>
                        <TabPanel value={activeTab} index={0}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/a/af/BPMN-AProcessWithNormalFlow.svg"
                                alt="fsdf"/>
                        </TabPanel>
                        <TabPanel value={activeTab} index={1}>
                            <TaskExecutionHistoryTable/>
                        </TabPanel>
                    </Card>
                </Grid>
            </Grid>
        </PageContent>
    )
}

export default TaskForceDetailView;