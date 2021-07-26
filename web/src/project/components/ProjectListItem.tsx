import React, {FunctionComponent, PropsWithChildren} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Divider, Grid, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreHoriz';
import SshKeyIcon from '@material-ui/icons/VpnKey';
import DeleteIcon from "@material-ui/icons/Delete"
import SettingsIcon from "@material-ui/icons/Settings"
import {Project, ProjectModel} from "../models/Project";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            border: "2px solid " + theme.palette.primary.contrastText,
            borderRadius: "4px",
            height: 75,
            marginBottom: 15,
            padding: 10,
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
                borderColor: theme.palette.primary.main,
            }
        },
        icon: {
            padding: 10
        },
        text: {
            textAlign: "left",
            fontWeight: 500,
            width: "250px"
        },
        danger: {
            color: "red"
        }
    }),
);

interface ProjectListItemProps {
    project: Project | ProjectModel;
}

const ProjectListItem: FunctionComponent<ProjectListItemProps> = (props: PropsWithChildren<ProjectListItemProps>) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid alignItems={"center"} justify={"space-between"} container className={classes.container} direction={"row"}>
            <Grid item>
                <Typography className={classes.text}>{props.project.id}</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.text}>{props.project.name}</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={handleClick} color={"primary"}>
                    <MoreIcon fontSize={"large"}/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <SshKeyIcon color={"action"} fontSize={"small"}/>
                        <Typography>Add SSH Key</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => history.push("/settings")}>
                        <SettingsIcon color={"action"} fontSize={"small"}/>
                        <Typography>Project Settings</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>
                        <DeleteIcon className={classes.danger} color={"action"} fontSize={"small"}/>
                        <Typography className={classes.danger}>Delete Project</Typography>
                    </MenuItem>

                </Menu>
            </Grid>
        </Grid>
    )
}

export default ProjectListItem;