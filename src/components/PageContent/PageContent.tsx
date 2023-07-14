import React, { FC, Fragment, } from 'react';

import type { PageContentProps, } from './PageContent.types';

const PageContent : FC<PageContentProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default PageContent;
