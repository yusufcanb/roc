import React, {FunctionComponent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

import {Box, Grid, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CodeIcon from "@material-ui/icons/Code";

import Editor from "@monaco-editor/react";
import {useStore} from "core/store";
import {EmptyState, LoadingState, PageContent} from "core/components";
import {ProjectDirectoryNavigation} from "project/components";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: "100%",
            background: "rgb(246, 248, 250)",
            margin: "5px 0px",
            "& input": {
                fontFamily: "monospace"
            }
        }
    }),
);

const Robot: FunctionComponent = (props) => {
    const classes = useStyles();
    const {projectStore} = useStore();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [editorContent, setEditorContent] = useState<string>();

    useEffect(() => {
        projectStore.fetchProjects();
    }, [])

    const handleSelect = (nodes: any) => {
        console.log(toJS(nodes));
        if (nodes.type === "file") {
            setSelectedFile(toJS(nodes).id);
            setEditorContent(toJS(nodes).content);
        }
    }

    const renderEmptyState = () => {
        return (
            <EmptyState
                icon={CodeIcon}
                title={"Empty Repository"}
                subTitle={"You need to push a repository in order to start viewing your project files."}>
                <Box>
                    <Typography align={"left"} variant={"body2"}>Add remote to your repository,</Typography>
                    <TextField
                        id="standard-read-only-input"
                        className={classes.textField}
                        size={"small"}
                        variant={"outlined"}
                        defaultValue={`git remote add roc git@${window.location.host}:roc/default.git`}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <Typography align={"left"} variant={"body2"}>Push to master branch,</Typography>
                    <TextField
                        id="standard-read-only-input"
                        className={classes.textField}
                        size={"small"}
                        variant={"outlined"}
                        defaultValue={`git push roc master`}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Box>
            </EmptyState>
        )
    }

    const renderLoadingState = () => {
        return (<LoadingState/>)
    }

    const renderContent = (project: any) => {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <ProjectDirectoryNavigation files={project.files} onSelect={handleSelect}/>
                </Grid>
                <Grid item xs={9}>
                    {selectedFile ? <Editor
                        options={{readOnly: true, minimap: false}}
                        height="100%"
                        width={"100%"}
                        defaultLanguage="python"
                        value={editorContent}
                    /> : <EmptyState title={"No File Selected"} subTitle={"Select a file to view it's content"}/>}
                </Grid>
            </Grid>
        )
    }

    if (projectStore.projects.length == 0 && !projectStore.isLoading) {
        return renderEmptyState();
    }

    return (
        <PageContent>
            {
                projectStore.isLoading && !projectStore.isErrored
                    ? renderLoadingState()
                    : renderContent(projectStore.getSelectedProject())
            }
        </PageContent>
    )
}

export default observer(Robot);
