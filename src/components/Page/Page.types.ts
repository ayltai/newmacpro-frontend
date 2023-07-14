import { ReactElement, } from 'react';

import { PageActionsProps, } from '../PageActions';
import { PageContentProps, } from '../PageContent';
import { PageTitleProps, } from '../PageTitle';

export interface PageProps {
    open?     : boolean,
    children? : ReactElement<PageActionsProps | PageContentProps | PageTitleProps> | ReactElement<PageActionsProps | PageContentProps | PageTitleProps>[],
    onClose?  : () => void,
}
