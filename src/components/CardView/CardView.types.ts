import { ReactElement, } from 'react';

import type { CardContentProps, } from '../CardContent';
import type { CardDescriptionProps, } from '../CardDescription';
import type { CardImageProps, } from '../CardImage';
import type { CardTitleProps, } from '../CardTitle';

export interface CardViewProps {
    align?           : 'left' | 'center' | 'right',
    children?        : ReactElement<CardContentProps | CardDescriptionProps | CardImageProps | CardTitleProps> | ReactElement<CardContentProps | CardDescriptionProps | CardImageProps | CardTitleProps>[],
    onClick?         : () => void,
    onMoreInfo?      : () => void,
    [ key : string ] : any,
}
