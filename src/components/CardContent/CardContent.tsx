import React, { FC, Fragment, } from 'react';

import type { CardContentProps, } from './CardContent.types';

const CardContent : FC<CardContentProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default CardContent;
