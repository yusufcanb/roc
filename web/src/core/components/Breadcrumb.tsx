import React, {FunctionComponent, PropsWithChildren} from "react";
import {observer} from "mobx-react-lite";

import {Breadcrumbs, Link, Typography} from "@material-ui/core";

interface BreadcrumbProps {
    state: Array<string>;
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = (props: PropsWithChildren<BreadcrumbProps>) => {
    const items = props.state.slice(0, props.state.length);
    const lastItem = items.pop();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                items.map(
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

export default observer(Breadcrumb);