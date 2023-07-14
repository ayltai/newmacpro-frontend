import { ReactNode, } from 'react';

export interface ActionProps {
    mode?            : 'default' | 'floating',
    color?           : 'inherit' | 'primary' | 'secondary',
    icon?            : ReactNode,
    badge?           : number,
    children?        : ReactNode,
    onClick?         : () => void,
    [ key : string ] : any,
}
