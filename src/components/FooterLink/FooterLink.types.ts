import { ReactNode, } from 'react';

export interface FooterLinkProps {
    children?        : ReactNode,
    onClick?         : () => void,
    [ key : string ] : any,
}
