import { Inventory as InventoryIcon, } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
import React from 'react';

import { Package, } from '../types';
import './ListView.css';

/**
 * ListViews show a list of Packages.
 * @param packages The list of packages to display.
 * @param maxRows The maximum number of rows to display.
 */
export const ListView = ({
    packages,
    maxRows,
} : {
    packages : Package[],
    maxRows? : number,
}) => (
    <List className={maxRows && packages.length > maxRows ? 'shadow' : undefined}>
        {(maxRows ? packages.slice(0, maxRows) : packages).map(pkg => (
            <ListItem
                key={pkg.id}
                disableGutters
                disablePadding>
                <ListItemIcon>
                    {(pkg.logoUrls && pkg.logoUrls.length > 0) && (
                        <img
                            src={pkg.logoUrls[0]}
                            alt={pkg.displayName}
                            width={48}
                            height={48} />
                    )}
                    {(!pkg.logoUrls || pkg.logoUrls.length === 0) && (
                        <InventoryIcon />
                    )}
                </ListItemIcon>
                <ListItemText primary={pkg.displayName} />
            </ListItem>
        ))}
    </List>
);
