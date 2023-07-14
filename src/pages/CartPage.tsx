import { NotificationImportant as NotificationIcon, } from '@mui/icons-material';
import { Box, Divider, Link, Typography, useTheme, } from '@mui/material';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { v4 as uuid, } from 'uuid';

import { useAddCartMutation, } from '../apis';
import { CopyableTextField, Page, PageContent, PageTitle, } from '../components';
import { useAppSelector, } from '../hooks';
import { EmptySection, GridViewSection, } from '../sections';
import { Package, } from '../types';
import { handleError, } from '../utils';
import { PageProps, } from './Page.types';

export const CartPage = ({
    open,
    onClose,
} : PageProps) => {
    const { packages, } : { packages : Package[], } = useAppSelector(state => state.cart);

    const [ originalPackages, setOriginalPackages, ] = useState<Package[]>(packages);
    const [ cartId,           setCartId,           ] = useState<string | undefined>();

    const [ addCart, addCartResult, ] = useAddCartMutation();

    const theme = useTheme();

    const { t, } = useTranslation();

    useEffect(() => setCartId(uuid()),             [ open, ]);
    useEffect(() => setOriginalPackages(packages), [ open, ]);

    useEffect(() => {
        if (open && cartId && packages.length > 0) {
            addCart({
                id : cartId,
                packages,
            }).catch(handleError);
        }
    }, [ open, cartId, packages, ]);

    useEffect(() => {
        if (addCartResult.error) handleError(addCartResult.error);
    }, [ addCartResult.error, ]);

    return (
        <Page
            open={open}
            onClose={onClose}>
            <PageTitle>
                {t('cart.title', {
                    count : packages.length,
                })}
            </PageTitle>
            <PageContent>
                {packages.length > 0 && (
                    <>
                        <GridViewSection
                            title={t('cart.list_title')}
                            maxRows={2}
                            packages={originalPackages} />
                        <Divider />
                        {packages.some(pkg => pkg.source === 'App Store') && (
                            <Box
                                marginY={2}
                                display='flex'
                                alignItems='center'>
                                <NotificationIcon />
                                <Link
                                    marginLeft={1}
                                    href='https://support.apple.com/guide/app-store/fir6253293d/mac'
                                    target='_blank'>
                                    {t('note.app_store')}
                                </Link>
                            </Box>
                        )}
                        {packages.some(pkg => pkg.source === 'Tweak') && (
                            <Box
                                marginY={2}
                                display='flex'
                                alignItems='center'>
                                <NotificationIcon />
                                <Link
                                    marginLeft={1}
                                    href='https://developer.apple.com/documentation/security/disabling_and_enabling_system_integrity_protection'
                                    target='_blank'>
                                    {t('note.tweak')}
                                </Link>
                            </Box>
                        )}
                        <Divider />
                        <Typography
                            marginTop={2}
                            gutterBottom>
                            {t('cart.instruction')}
                        </Typography>
                        <CopyableTextField
                            sx={{
                                backgroundColor : theme.palette.divider,
                            }}
                            fullWidth
                            copyHint={t('cart.copy.success')}
                            copyText={t('cart.copy.action')}
                            value={`/bin/bash -c "$(curl -fsSL '${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_ENDPOINT!}/api/carts/${cartId}')"`} />
                    </>
                )}
                {packages.length === 0 && (
                    <EmptySection>{t('cart.empty')}</EmptySection>
                )}
            </PageContent>
        </Page>
    );
};
