import React, {FunctionComponent, PropsWithChildren} from "react";
import {useHistory} from "react-router-dom";


import {Button, Divider, ListItemIcon, Menu, MenuItem, Typography} from "@material-ui/core";
import {ArrowDropDown, ArrowRight as ArrowRigthIcon, SettingsApplications as NewProjectIcon} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';

import {Project} from "../models/Project";
import {useStore} from "../../core/store";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        border: "1px solid gray",
        borderRadius: "5px"
    },
    icon: {marginBottom: "2px"}
}));

interface ProjectSelectProps {
    projects: Array<Project>;
}

const ProjectSelect: FunctionComponent<ProjectSelectProps> = (props: PropsWithChildren<ProjectSelectProps>) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {projectStore} = useStore();

    const classes = useStyles();
    const history = useHistory();


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl((event as any).currentTarget);
    };

    const handleManage = () => {
        handleClose()
        history.push("/projects");
    }

    const handleSelect = (id: string | number) => {
        projectStore.setSelectedProject(id);
        handleClose();
    }

    return (
        <React.Fragment>
            <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowDropDown className={classes.icon}/>}
            >
                {
                    projectStore.selectedProject
                        ? projectStore.selectedProject.name
                        : "No Project Selected"
                }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    props.projects.map(p => (
                        <MenuItem key={p.id} onClick={() => handleSelect(p.id)}>
                            <ListItemIcon>
                                <ArrowRigthIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                {p.name}
                            </Typography>
                        </MenuItem>
                    ))
                }
                <Divider/>
                <MenuItem onClick={handleManage}>
                    <ListItemIcon>
                        <NewProjectIcon/>
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Manage Projects
                    </Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProjectSelect;