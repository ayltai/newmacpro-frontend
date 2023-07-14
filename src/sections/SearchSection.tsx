import { Box, useMediaQuery, } from '@mui/material';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { Description, FilteredSearchBox, SearchBoxProps, Section, SectionContent, SectionForeground, SectionTitle, } from '../components';

type image = {
    width  : [ number, number, ],
    height : [ number, number, ],
    src    : string,
};

const images : image[] = [
    {
        width  : [ 480, 320,],
        height : [ 375, 250,],
        src    : '/images/newmac-1.webp',
    },
    {
        width  : [ 504, 315,],
        height : [ 280, 175,],
        src    : '/images/newmac-2.webp',
    },
    {
        width  : [ 495, 375,],
        height : [ 236, 179,],
        src    : '/images/newmac-3.webp',
    },
    {
        width  : [ 648, 360,],
        height : [ 270, 150,],
        src    : '/images/newmac-4.webp',
    },
];

export const SearchSection = ({
    isLoading,
    onSearch,
} : SearchBoxProps) => {
    const [ imageId, setImageId, ] = useState<number | undefined>();

    const desktopMode = useMediaQuery('(min-width: 900px)');

    const { t, } = useTranslation();

    useEffect(() => setImageId(Math.floor(Math.random() * images.length)), []);

    return (
        <Section
            background='linear-gradient(315deg, rgba(0,150,136,0.2), rgba(178,223,219,0) 35%),linear-gradient(200deg, rgba(255,87,34,0.2), rgba(251,233,231,0) 45%),linear-gradient(145deg, rgba(255,224,130,0.3), rgba(255,224,130,0) 55%)'
            layout='left'>
            <SectionForeground>
                <Box
                    paddingX={4}
                    paddingY={6}
                    textAlign='right'>
                    {imageId !== undefined && (
                        <img
                            width={images[imageId].width[desktopMode ? 0 : 1]}
                            height={images[imageId].height[desktopMode ? 0 : 1]}
                            alt={t('app.name')}
                            src={images[imageId].src} />
                    )}
                </Box>
            </SectionForeground>
            <SectionTitle
                marginTop={12}
                variant='h3'>
                {t('section.search.title')}
            </SectionTitle>
            <Description variant='h6'>{t('section.search.description')}</Description>
            <SectionContent>
                <Box marginY={4}>
                    <FilteredSearchBox
                        isLoading={isLoading}
                        hint={t('search.placeholder')}
                        onSearch={onSearch} />
                </Box>
            </SectionContent>
        </Section>
    );
};
