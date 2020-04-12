import React from "react";
import {useScrollTrigger, WithStyles, Zoom} from "@material-ui/core";
import {styles} from './styles';

interface ScrollTopProps {
    children: React.ReactElement;
}

export default function ScrollTop(props: ScrollTopProps & WithStyles<typeof styles>) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={props.classes.root}>
                {children}
            </div>
        </Zoom>
    );
}