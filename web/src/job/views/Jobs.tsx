import React, {FunctionComponent} from "react";
import {Box, Button, Divider, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Icon from "@material-ui/icons/AccountTree";
import ArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import {EmptyState, PageContent} from "core/components";
import {GeneralInfo, QuickStat} from "job/components";

import {useStore} from "core/store";

const STATS = [
    {text: "Running Jobs", content: "32"},
    {text: "Scheduled Jobs", content: "32"},
    {text: "Successful Operation", content: "10"},
    {text: "Failed Operation", content: "6"},
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            border: "2px solid #333",
            borderRadius: "4px",
            height: 100,
            display: "flex",
            background: "#fff"
        },
        quickStat: {
            border: "2px solid #333",
            borderRadius: "4px",
            width: "auto",
            display: "flex",
            flexGrow: 1,
            margin: 5,
            background: "#fff"
        },
        taskListContainer: {
            border: "2px solid #333",
            borderRadius: "4px",
            height: 200,
            display: "flex",
            background: "#fff"
        },
        control: {
            padding: theme.spacing(2),
        }
    }),
);

const Jobs: FunctionComponent = () => {
    const classes = useStyles();
    const {jobStore} = useStore();

    const actionButton = (
        <Button
            variant={"outlined"}
            startIcon={<ArrowRightIcon/>}>
            Go to Task Force
        </Button>
    );

    const renderEmptyState = () => (
        <Box width={"100%"} height={"100%"}>
            <EmptyState icon={Icon}
                        title={"No Jobs Found"}
                        subTitle={"Your assistant shows you fun new things automatically\n" +
                        "ceated from your photos and helps you to say organised"}
                        actionButton={actionButton}
            />
        </Box>
    )

    const renderPage = () => {
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>General Info & Quick Stats</Typography>
                    <Box className={classes.paper}>
                        <GeneralInfo stats={STATS}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify={"space-between"}>
                        <Grid item className={classes.quickStat} alignContent={"center"} justify={"center"}>
                            <QuickStat text={"Online Factories"} content={"0 / 5"}/>
                        </Grid>
                        <Grid item className={classes.quickStat} alignContent={"center"} justify={"center"}>
                            <QuickStat text={"Scheculed Tasks"} content={"10"}/>
                        </Grid>
                        <Grid item className={classes.quickStat} alignContent={"center"} justify={"center"}>
                            <QuickStat text={"Number of Robots"} content={"22"}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={"h5"}>Currently Running (5)</Typography>
                    <Box className={classes.taskListContainer}>
                        <List style={{width: "100%", padding: 0}}>
                            <ListItem button dense={true}>
                                <ListItemText primary='Task Force 123'/>
                            </ListItem>
                            <Divider/>
                        </List>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={"h5"}>Latest Runs (5)</Typography>
                    <Box className={classes.taskListContainer}></Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={"h5"}>Future Runs (5)</Typography>
                    <Box className={classes.taskListContainer}></Box>
                </Grid>

            </Grid>
        )
    }

    return (
        <PageContent>
            {jobStore.getIsEmpty() ? renderEmptyState() : renderPage()}
        </PageContent>
    )
}

export default Jobs;