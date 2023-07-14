import { Button, } from '@mui/material';
import { useConfirm, } from 'material-ui-confirm';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useDeleteBundleMutation, useGetBundleQuery, useUpdateBundleMutation, } from '../apis';
import { BundleDetails, Loading, Message, Page, PageActions, PageContent, PageTitle, } from '../components';
import type { Bundle, } from '../types';
import { handleError, } from '../utils';
import { PageProps, } from './Page.types';

export const ViewBundlePage = ({
    open,
    bundleId,
    idToken,
    onClose,
} : PageProps & {
    bundleId : string,
    idToken? : string,
}) => {
    const { data, refetch, error, isFetching, isLoading, } = useGetBundleQuery({
        bundleId,
        idToken,
    });

    const [ updateBundle, updateBundleResult, ] = useUpdateBundleMutation();
    const [ deleteBundle, deleteBundleResult, ] = useDeleteBundleMutation();

    const [ bundle,     setBundle,     ] = useState<Bundle | undefined>({
        id       : bundleId,
        packages : [],
    });
    const [ message,    setMessage,    ] = useState<string | undefined>();
    const [ hasError,   setHasError,   ] = useState(false);
    const [ hasMessage, setHasMessage, ] = useState(false);

    const confirm = useConfirm();

    const { t, } = useTranslation();

    const handleMessageClose = () => {
        setHasMessage(false);

        if (onClose) onClose();
    };

    const handleErrorClose = () => {
        setHasError(false);

        if (onClose) onClose();
    };

    const handleUpdate = async () => {
        if (idToken) await updateBundle({
            bundle : bundle!,
            idToken,
        });
    };

    const handleDelete = () => {
        if (idToken) confirm({
            title       : t('bundle.delete.confirm_title'),
            description : t('bundle.delete.confirm_description'),
        }).then(async () => {
            await deleteBundle({
                bundleId,
                idToken,
            });
        }).catch(() => {
            // Does nothing
        });
    };

    useEffect(() => {
        if (updateBundleResult.isError) {
            setMessage('message.bundle.update_failed');
            setHasMessage(true);
        } else if (updateBundleResult.isSuccess) {
            setMessage('message.bundle.updated');
            setHasMessage(true);

            refetch().catch(handleError);
        }
    }, [ updateBundleResult.isError, updateBundleResult.isSuccess, ]);

    useEffect(() => {
        if (deleteBundleResult.isError) {
            setMessage('message.bundle.create_failed');
            setHasMessage(true);
        } else if (deleteBundleResult.isSuccess) {
            setMessage('message.bundle.created');
            setHasMessage(true);

            refetch().catch(handleError);
        }
    }, [ deleteBundleResult.isError, deleteBundleResult.isSuccess, ]);

    useEffect(() => setBundle(data), [ data, ]);

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
                    {t('bundle.load.title')}
                </PageTitle>
                <PageContent>
                    {bundle && (
                        <BundleDetails
                            readOnly={!idToken}
                            bundle={bundle}
                            onChange={setBundle} />
                    )}
                </PageContent>
                <PageActions sx={{
                    display : idToken ? 'flex' : 'none',
                }}>
                    <Button onClick={handleUpdate}>{t('action.update_bundle')}</Button>
                    <Button onClick={handleDelete}>{t('action.delete_bundle')}</Button>
                </PageActions>
            </Page>
            <Loading
                show={!hasMessage && (isLoading || isFetching)}
                message={t('bundle.load.in_progress')} />
            <Message
                open={hasMessage}
                message={message ? t(message) : ''}
                onClose={handleMessageClose} />
            <Message
                open={hasError}
                message={t('message.bundle.load_failed')}
                onClose={handleErrorClose} />
        </>
    );
};
