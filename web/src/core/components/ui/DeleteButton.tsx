import React from "react";

import {withStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const DeleteButton = withStyles({
    root: {
        color: red["500"],
    },
    label: {
        textTransform: 'capitalize',
    },
})(IconButton);

export default DeleteButton;