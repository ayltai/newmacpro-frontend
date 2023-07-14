import { Search as SearchIcon, } from '@mui/icons-material';
import { CircularProgress, InputBase, } from '@mui/material';
import { styled, } from '@mui/material/styles';
import React, { ChangeEvent, FC, useCallback, useEffect, useState, } from 'react';
import { useDebounce, } from 'usehooks-ts';

import type { SearchBoxProps, } from './SearchBox.types';

const Search = styled('div')(({ theme, }) => ({
    position        : 'relative',
    borderRadius    : '2rem',
    backgroundColor : theme.palette.action.selected,
    '&:hover'       : {
        backgroundColor : theme.palette.action.focus,
    },
}));

const SearchIconWrapper = styled('div')(({ theme, }) => ({
    padding        : theme.spacing(0, 2),
    height         : '100%',
    position       : 'absolute',
    pointerEvents  : 'none',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme, }) => ({
    color                   : 'inherit',
    '& .MuiInputBase-input' : {
        padding                          : theme.spacing(1, 1, 1, 0),
        paddingLeft                      : `calc(1em + ${ theme.spacing(4) })`,
        transition                       : theme.transitions.create('width'),
        width                            : '100%',
        [ theme.breakpoints.down('lg') ] : {
            width     : '20ch',
            '&:focus' : {
                width : '26ch',
            },
        },
        [ theme.breakpoints.up('lg') ]   : {
            width     : '32ch',
            '&:focus' : {
                width : '48ch',
            },
        },
    },
}));

/**
 * SearchBoxes let users enter search queries.
 * @param isLoading Whether the search process is in progress.
 * @param hint The hint text to display.
 * @param onSearch The callback function to call when the search keyword is changed.
 */
const SearchBox : FC<SearchBoxProps> = ({
    isLoading = false,
    hint,
    onSearch,
}) => {
    const [ keyword, setKeyword, ] = useState<string>('');

    const debouncedKeyword = useDebounce(keyword, 400);

    const handleChange = useCallback((event : ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value), [ setKeyword, ]);

    useEffect(() => {
        if (!isLoading && onSearch) onSearch(debouncedKeyword);
    }, [ debouncedKeyword, isLoading, onSearch, ]);

    return (
        <Search>
            <SearchIconWrapper>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        color='inherit' />
                )}
                {!isLoading && <SearchIcon />}
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={hint}
                value={keyword}
                onChange={handleChange} />
        </Search>
    );
};

export default SearchBox;
