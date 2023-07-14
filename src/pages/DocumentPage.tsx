import { Container, } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState, } from 'react';

import { Page, PageContent, PageTitle, } from '../components';
import { handleError, } from '../utils';
import { PageProps, } from './Page.types';

export const DocumentPage = ({
    open,
    title,
    docPath,
    onClose,
} : PageProps & {
    title   : string,
    docPath : string,
}) => {
    const [ content, setContent, ] = useState<string>('');

    const fetchContent = async (path : string) => {
        const file = await fetch(path);

        return await file.text();
    };

    useEffect(() => {
        fetchContent(docPath).then(setContent).catch(handleError);
    }, [ docPath, ]);

    return (
        <Page
            open={open}
            onClose={onClose}>
            <PageTitle>
                {title}
            </PageTitle>
            <PageContent>
                <Container maxWidth='lg'>
                    <Markdown>{content}</Markdown>
                </Container>
            </PageContent>
        </Page>
    );
};
