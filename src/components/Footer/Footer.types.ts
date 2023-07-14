import { ReactElement, } from 'react';

import type { FooterLinkProps, } from '../FooterLink';

export interface FooterProps {
    background?      : string,
    maxWidth?        : 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    children?        : ReactElement<FooterLinkProps> | ReactElement<FooterLinkProps>[],
    [ key : string ] : any,
}
