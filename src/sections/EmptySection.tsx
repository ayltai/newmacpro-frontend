import React, { ReactNode, } from 'react';

import { Description, Section, } from '../components';

export const EmptySection = ({
    children,
    ...rest
} : {
    children?         : ReactNode,
    [ rest : string ] : any,
}) => (
    <Section {...rest}>
        <Description
            variant='h6'
            marginY={6}>
            {children}
        </Description>
    </Section>
);
