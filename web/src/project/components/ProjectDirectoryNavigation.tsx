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
        paddingRight: 25,
    },
});

const ProjectDirectoryNavigation: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const tree: RenderTree = {
        id: 'repository-root',
        name: 'Default Project',
        type: "file",
        children: props.files
    };

    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={`${nodes.type}_${nodes.id}`}
                  nodeId={`${nodes.type}_${nodes.id}`}
                  label={nodes.name}
                  icon={nodes.type?.toLowerCase() === "file" ? <DescriptionOutlinedIcon fontSize={"small"}/> : null}
                  onClick={() => props.onSelect(nodes)}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpanded={['file_repository-root']}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {renderTree(tree)}
        </TreeView>
    );
}

export default ProjectDirectoryNavigation;