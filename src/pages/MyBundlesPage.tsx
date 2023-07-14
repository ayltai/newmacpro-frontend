import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useGetBundlesQuery, } from '../apis';
import { Loading, Message, Page, PageContent, PageTitle, } from '../components';
import { GridViewSection, } from '../sections';
import { handleError, } from '../utils';
import type { PageProps, } from './Page.types';

export const MyBundlesPage = ({
    open,
    idToken,
    onClose,
} : PageProps & {
    idToken : string,
}) => {
    const { data, refetch, error, isFetching, isLoading, } = useGetBundlesQuery({
        idToken,
    });

    const [ hasError, setHasError, ] = useState(false);

    const { t, } = useTranslation();

    const handleAlertClose = () => {
        setHasError(false);

        if (onClose) onClose();
    };

    const handleBundlesUpdated = async () => await refetch();

    useEffect(() => {
        if (error) {
            setHasError(true);

            handleError(error);
        }
    }, [ error, ]);

    return (
        <>
            <Page
                open={open}
                onClose={onClose}>
                <PageTitle>
                    {t('user.bundles')}
                </PageTitle>
                <PageContent>
                    {data && (
                        <GridViewSection
                            idToken={idToken}
                            title={t('user.bundled_items', {
                                count : data.length,
                            })}
                            bundles={data}
                            maxRows={2}
                            onBundlesUpdated={handleBundlesUpdated} />
                    )}
                </PageContent>
            </Page>
            <Loading
                show={!hasError && (isLoading || isFetching)}
                message={t('bundle.load.in_progress')} />
            <Message
                open={hasError}
                message={t('message.bundle.load_failed')}
                onClose={handleAlertClose} />
        </>
    );
};
