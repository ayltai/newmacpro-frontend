import { ReactElement, } from 'react';

import type { DescriptionProps, } from '../Description';
import type { SectionContentProps, } from '../SectionContent';
import type { SectionForegroundProps, } from '../SectionForeground';
import type { SectionNameProps, } from '../SectionName';
import type { SectionTitleProps, } from '../SectionTitle';

export interface SectionProps {
    anchor?          : string,
    background?      : string,
    maxWidth?        : 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    layout?          : 'center' | 'left' | 'right',
    children?        : ReactElement<SectionContentProps | DescriptionProps | SectionForegroundProps | SectionNameProps | SectionTitleProps> | ReactElement<SectionContentProps | DescriptionProps | SectionForegroundProps | SectionNameProps | SectionTitleProps>[],
    [ key : string ] : any,
}
