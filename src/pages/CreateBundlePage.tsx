import { Button, } from '@mui/material';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { adjectives, animals, colors, names, uniqueNamesGenerator, } from 'unique-names-generator';
import { v4 as uuid, } from 'uuid';

import { useCreateBundleMutation, } from '../apis';
import { BundleDetails, Loading, Message, Page, PageActions, PageContent, PageTitle, } from '../components';
import { useAppSelector, } from '../hooks';
import { Bundle, Package, } from '../types';
import { capitalizeFirstLetter, handleError, } from '../utils';
import { PageProps, } from './Page.types';

export const CreateBundlePage = ({
    open,
    idToken,
    onClose,
} : PageProps & {
    idToken? : string,
}) => {
    const { t, } = useTranslation();

    const { packages, } : { packages : Package[], } = useAppSelector(state => state.cart);

    const [ bundle, setBundle, ] = useState<Bundle>({
        id          : uuid(),
        displayName : t('bundle.create.default_display_name', {
            name : capitalizeFirstLetter(uniqueNamesGenerator({
                dictionaries : [
                    adjectives,
                    animals,
                    colors,
                    names,
                ],
                separator    : ' ',
                length       : 2,
            })),
        }),
        packages,
    });

    const [ message,    setMessage,    ] = useState<string | undefined>();
    const [ hasMessage, setHasMessage, ] = useState<boolean>(false);

    const [ createBundle, createBundleResult, ] = useCreateBundleMutation();

    const handleMessageClose = () => {
        setHasMessage(false);

        if (onClose) onClose();
    };

    const handleChange = (newBundle : Bundle) => setBundle(newBundle);

    const handleClick = async () => {
        if (idToken) await createBundle({
            bundle,
            idToken,
        });
    };

    useEffect(() => {
        if (createBundleResult.isError) {
            setMessage('message.bundle.create_failed');
            setHasMessage(true);
        } else if (createBundleResult.isSuccess) {
            setMessage('message.bundle.created');
            setHasMessage(true);
        }
    }, [ createBundleResult.isError, createBundleResult.isSuccess, ]);

    useEffect(() => {
        if (createBundleResult.error) handleError(createBundleResult.error);
    }, [ createBundleResult.error, ]);

    return (
        <>
            <Page
                open={open}
                onClose={onClose}>
                <PageTitle>
                    {t('bundle.create.title')}
                </PageTitle>
                <PageContent>
                    <BundleDetails
                        bundle={bundle}
                        onChange={handleChange} />
                </PageContent>
                <PageActions>
                    <Button onClick={handleClick}>{t('action.create_bundle')}</Button>
                </PageActions>
            </Page>
            <Loading
                show={!hasMessage && createBundleResult.isLoading}
                message={t('bundle.create.in_progress')} />
            <Message
                open={hasMessage}
                message={message ? t(message) : undefined}
                onClose={handleMessageClose} />
        </>
    );
};
