import React from "react";

import {withStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const StyledAvatar = withStyles({
    root: {
        color: red["500"],
    },
})(IconButton);

export default StyledAvatar;