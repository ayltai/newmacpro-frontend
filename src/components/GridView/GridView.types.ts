import { ReactElement, } from 'react';

import type { CardViewProps, } from '../CardView';
import type { SelectableCardViewProps, } from '../SelectableCardView';

export interface GridViewProps {
    expanded?        : boolean,
    maxRows?         : number,
    children?        : ReactElement<CardViewProps | SelectableCardViewProps> | ReactElement<CardViewProps | SelectableCardViewProps>[],
    [ key : string ] : any,
}
