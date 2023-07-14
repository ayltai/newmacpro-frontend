import { ReactElement, } from 'react';

import type { ActionProps, } from '../Action';
import type { BrandingProps, } from '../Branding';
import type { ShortcutProps, } from '../Shortcut';

export interface TopBarProps {
    maxWidth? : 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    children? : ReactElement<ActionProps | BrandingProps | ShortcutProps> | ReactElement<ActionProps | BrandingProps | ShortcutProps>[],
}
