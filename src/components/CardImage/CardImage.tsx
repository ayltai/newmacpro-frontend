import { CardMedia, } from '@mui/material';
import React, { FC, } from 'react';

import type { CardImageProps, } from './CardImage.types';

const CardImage : FC<CardImageProps> = ({
    height,
    imageUrl,
    altText,
    ...rest
}) => (
    <CardMedia
        sx={{
            height,
            objectFit : 'contain',
        }}
        component='img'
        image={imageUrl}
        title={altText}
        {...rest} />
);

export default CardImage;
