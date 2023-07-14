import { useTheme, } from '@mui/material';
import React, { ComponentType, } from 'react';

import { default as CardView, CardViewProps, } from './CardView';

export type SelectableCardViewProps = Omit<CardViewProps, 'onClick'> & {
    selected? : boolean,
    onSelect? : (selected : boolean) => void,
};

/**
 * A higher-order component that adds the ability to select a CardView.
 * @param Component The component to wrap, normally a CardView.
 */
const withSelectable = (Component : ComponentType<SelectableCardViewProps>) => {
    const ComponentWithSelectable : (props : SelectableCardViewProps) => React.JSX.Element = (props : SelectableCardViewProps) => {
        const { sx, children, selected = false, onSelect, ...rest } = props;

        const theme = useTheme();

        const handleClick = () => {
            if (onSelect) onSelect(!selected);
        };

        return (
            <Component
                sx={{
                    ...sx,
                    border : `6px solid ${selected ? theme.palette.primary.main : theme.palette.background.paper}`,
                }}
                {...rest}
                onClick={handleClick}>
                {children}
            </Component>
        );
    };

    return ComponentWithSelectable;
};

export default withSelectable(CardView);
