import { Check as CheckIcon, FilterAlt as FilterIcon, } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, } from '@mui/material';
import React, { ComponentType, Fragment, MouseEvent, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useAppDispatch, useAppSelector, } from '../hooks';
import { addFilter, removeFilter, } from '../states';
import { default as SearchBox, SearchBoxProps, } from './SearchBox';

const Filter = ({
    selectedFilters = [],
    onChange,
} : {
    selectedFilters? : string[],
    onChange         : (filter : string, selected : boolean) => void,
}) => {
    const [ anchorElement, setAnchorElement, ] = useState<null | HTMLElement>(null);

    const { t, } = useTranslation();

    const filters : Record<string, string> = t('search.filters', {
        returnObjects : true,
    });

    const handleClick = (event : MouseEvent<HTMLButtonElement>) => setAnchorElement(event.currentTarget);

    const handleClose = () => setAnchorElement(null);

    return (
        <Fragment>
            <IconButton
                sx={{
                    marginLeft : 0.5,
                }}
                size='medium'
                edge='end'
                color='inherit'
                aria-label='filter'
                onClick={handleClick}>
                <FilterIcon />
            </IconButton>
            <Menu
                open={Boolean(anchorElement)}
                anchorEl={anchorElement}
                anchorOrigin={{
                    horizontal : 'left',
                    vertical   : 'bottom',
                }}
                transformOrigin={{
                    horizontal : 'left',
                    vertical   : 'top',
                }}
                onClose={handleClose}>
                {Object.keys(filters).map(key => {
                    const handleSelect = () => {
                        handleClose();

                        onChange(key, !selectedFilters.includes(key));
                    };

                    return (
                        <MenuItem
                            key={key}
                            onClick={handleSelect}>
                            {selectedFilters.includes(key) && (
                                <>
                                    <ListItemIcon>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    {filters[key]}
                                </>

                            )}
                            {!selectedFilters.includes(key) && (
                                <ListItemText inset>{filters[key]}</ListItemText>
                            )}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Fragment>
    );
};

/**
 * FilteredSearchBoxes let users enter search queries and filter the results.
 * @param Component The component to wrap, normally a SearchBox component.
 */
const withFilter = (Component : ComponentType<SearchBoxProps>) => {
    const ComponentWithFilter : (props : SearchBoxProps) => React.JSX.Element = (props : SearchBoxProps) => {
        const filters  = useAppSelector(state => state.pref.filters);
        const dispatch = useAppDispatch();

        const mobileMode = useMediaQuery('(max-width: 900px)');

        const handleChange = (filter : string, selected : boolean) => {
            dispatch(selected ? addFilter(filter) : removeFilter(filter));
        };

        return (
            <Box
                display='flex'
                flexDirection='row'>
                {mobileMode && <Box flexGrow={1} />}
                <Component {...props} />
                <Filter
                    selectedFilters={filters}
                    onChange={handleChange} />
                {mobileMode && <Box flexGrow={1} />}
            </Box>
        );
    };

    return ComponentWithFilter;
};

export default withFilter(SearchBox);
