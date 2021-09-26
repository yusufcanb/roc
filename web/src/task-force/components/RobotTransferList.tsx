import React, {FunctionComponent} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {ListSubheader} from "@material-ui/core";
import {useStore} from "../../core/store";
import {FileTree} from "../../project/models/Project";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
        },
        cardHeader: {
            padding: theme.spacing(1, 2),
        },
        list: {
            minWidth: 400,
            minHeight: 400,
            maxHeight: 400,
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            padding: 0
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
    }),
);

function not(a: FileTree[], b: FileTree[]) {
    return a.filter((value: FileTree) => b.findIndex((f) => value.id === f.id) === -1);
}

function intersection(a: FileTree[], b: FileTree[]) {
    return a.filter((value: FileTree) => b.findIndex((f) => value.id === f.id) !== -1);
}

function union(a: FileTree[], b: FileTree[]) {
    return [...a, ...not(b, a)];
}

const RobotTransferList: FunctionComponent = () => {
    const classes = useStyles();

    const {robotStore} = useStore();

    const [checked, setChecked] = React.useState<Array<FileTree>>([]);
    const [left, setLeft] = React.useState<Array<FileTree>>(robotStore.robots);
    const [right, setRight] = React.useState<Array<FileTree>>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: FileTree) => () => {
        const currentIndex = checked.findIndex((f) => f.id === value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: FileTree[]) => intersection(checked, items).length;

    const handleToggleAll = (items: FileTree[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title: React.ReactNode, items: FileTree[]) => (
        <List className={classes.list} dense component="div" role="list">
            <ListSubheader>
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                    disabled={items.length === 0}
                    inputProps={{'aria-label': 'all items selected'}}
                />
                {`${title} (${numberOfChecked(items)}/${items.length})`}
            </ListSubheader>
            <Divider/>
            {items.map((value: FileTree) => {
                const labelId = `transfer-list-all-item-${value.id}-label`;
                return (
                    <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.findIndex((c) => c.id === value.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.name}/>
                    </ListItem>
                );
            })}
            <ListItem/>
        </List>
    );

    return (
        <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>{customList('Available Robots', left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('Assigned Robots', right)}</Grid>
        </Grid>
    );
}

export default RobotTransferList;