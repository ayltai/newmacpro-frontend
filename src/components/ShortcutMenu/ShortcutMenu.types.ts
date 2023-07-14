import { ReactElement, } from 'react';

import { ShortcutProps, } from '../Shortcut';

export interface ShortcutMenuProps {
    children?        : ReactElement<ShortcutProps> | ReactElement<ShortcutProps>[],
    [ key : string ] : any,
}
