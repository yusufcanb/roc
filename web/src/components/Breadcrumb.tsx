import React, {FunctionComponent, PropsWithChildren} from "react";

import {Breadcrumbs, Link, Typography} from "@material-ui/core";

interface BreadcrumbProps {
    state: Array<string>;
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = (props: PropsWithChildren<BreadcrumbProps>) => {
    const lastItem = props.state.pop();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                props.state.map(
                    (link: string) => {
                        return (
                            <Link key={link} color="inherit" href="/">
                                {link}
                            </Link>
                        );
                    }
                )
            }
            <Typography color="textPrimary">{lastItem}</Typography>
        </Breadcrumbs>
    );
}

export default Breadcrumb;