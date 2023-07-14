import { Divider, Stack, TextField, Typography, } from '@mui/material';
import Filter from 'bad-words';
import React, { ChangeEvent, useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';
import { adjectives, animals, colors, names, uniqueNamesGenerator, } from 'unique-names-generator';

import { Bundle, } from '../types';
import { capitalizeFirstLetter, } from '../utils';
import { ListView, } from './ListView';

export const BundleDetails = ({
    readOnly = true,
    bundle,
    onChange,
} : {
    readOnly? : boolean,
    bundle    : Bundle,
    onChange? : (bundle : Bundle) => void,
}) => {
    const { t, } = useTranslation();

    const filter = new Filter();

    const handleDisplayNameChange = (event : ChangeEvent<HTMLInputElement>) => {
        const displayName = filter.clean(event.target.value);

        if (onChange) onChange({
            ...bundle,
            displayName,
        });
    };

    const handleDescriptionChange = (event : ChangeEvent<HTMLInputElement>) => {
        const description = filter.clean(event.target.value);

        if (onChange) onChange({
            ...bundle,
            description,
        });
    };

    useEffect(() => {
        if (!(bundle?.displayName) && onChange) onChange({
            ...bundle,
            displayName : t('bundle.create.default_display_name', {
                name : capitalizeFirstLetter(uniqueNamesGenerator({
                    dictionaries : [
                        adjectives,
                        animals,
                        colors,
                        names,
                    ],
                    separator    : ' ',
                    length       : 2,
                })),
            }),
        });
    }, []);

    return (
        <Stack spacing={2}>
            <TextField
                required
                error={(bundle?.displayName ?? '').trim().length === 0}
                disabled={readOnly}
                label={t('bundle.create.display_name')}
                value={bundle?.displayName}
                onChange={handleDisplayNameChange} />
            <TextField
                disabled={readOnly}
                label={t('bundle.create.description')}
                value={bundle?.description}
                onChange={handleDescriptionChange} />
            <Divider />
            <Typography variant='h6'>{t('bundle.create.items')}</Typography>
            <ListView packages={bundle?.packages ?? []} />
        </Stack>
    );
};
