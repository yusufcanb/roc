import React, {FunctionComponent} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

interface RenderTree {
    id: string;
    name: string;
    type?: string;
    children?: RenderTree[];
}

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const ProjectDirectoryNavigation: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const tree: RenderTree = {
        id: 'root',
        name: 'Default Project',
        type: "root",
        children: props.files
    };

    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={nodes.id}
                  nodeId={nodes.id}
                  label={nodes.name}
                  icon={nodes.type === "file" ? <DescriptionOutlinedIcon fontSize={"small"}/> : null}
                  onClick={() => props.onSelect(nodes)}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {renderTree(tree)}
        </TreeView>
    );
}

export default ProjectDirectoryNavigation;