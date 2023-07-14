import { useAuth0, } from '@auth0/auth0-react';
import { AddCircle as AddIcon, CloudDownload as CloudDownloadIcon, LocalMall as CartIcon, } from '@mui/icons-material';
import { SpeedDialAction, Typography, useTheme, } from '@mui/material';
import MiniSearch from 'minisearch';
import React, { useEffect, useRef, useState, useTransition, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useGetBundlesQuery, useCaskQuery, useCoreQuery, useGetTweaksQuery, useSearchQuery, } from '../apis';
import { Action, Branding, Footer, FooterLink, Loading, Screen, Shortcut, TopBar, } from '../components';
import { BUNDLES_REFRESH_INTERVAL, DOCUMENTS, HOMEBREW_REFRESH_INTERVAL, MIN_SEARCH_LENGTH, POPULAR_APPS, POPULAR_PACKAGES, POPULAR_TWEAKS, SEARCH_FUZZINESS, SEARCH_MAX_RESULTS, TWEAKS_REFRESH_INTERVAL, } from '../constants';
import { useAppSelector, } from '../hooks';
import { CartPage, CreateBundlePage, DocumentPage, MyBundlesPage, } from '../pages';
import { EmptySection, GridViewSection, SearchSection, } from '../sections';
import { Package, SearchFilter, } from '../types';
import { handleError, } from '../utils';

export const HomeScreen = () => {
    const { getIdTokenClaims, isAuthenticated, loginWithRedirect, logout, } = useAuth0();

    const { filters, }  : { filters  : string[],  } = useAppSelector(state => state.pref);
    const { packages, } : { packages : Package[], } = useAppSelector(state => state.cart);

    const [ idToken,               setIdToken,               ] = useState<string | undefined>();
    const [ isLoading ,            setIsLoading,             ] = useState<boolean>(true);
    const [ searchKeyword,         setSearchKeyword,         ] = useState<string>('');
    const [ matchedPackages,       setMatchedPackages,       ] = useState<Package[] | undefined>();
    const [ isCartOpen,            setIsCartOpen,            ] = useState<boolean>(false);
    const [ isCreateBundleOpen,    setIsCreateBundleOpen,    ] = useState<boolean>(false);
    const [ isMyBundleOpen,        setIsMyBundleOpen,        ] = useState<boolean>(false);
    const [ isDocumentOpen,        setIsDocumentOpen,        ] = useState<boolean>(false);
    const [ selectedDocumentIndex, setSelectedDocumentIndex, ] = useState<number>(0);

    const { data : bundleData, error : bundleError, } = useGetBundlesQuery({
        idToken,
    }, {
        pollingInterval : BUNDLES_REFRESH_INTERVAL,
    });

    const { data : caskData, error : caskError, } = useCaskQuery(undefined, {
        pollingInterval : HOMEBREW_REFRESH_INTERVAL,
    });

    const { data : coreData, error : coreError, } = useCoreQuery(undefined, {
        pollingInterval : HOMEBREW_REFRESH_INTERVAL,
    });

    const { data : searchData, error : searchError, } = useSearchQuery(searchKeyword, {
        skip : searchKeyword.length < MIN_SEARCH_LENGTH,
    });

    const { data : tweakData, error : tweakError, } = useGetTweaksQuery(undefined, {
        pollingInterval : TWEAKS_REFRESH_INTERVAL,
    });

    const searchEngine = useRef<MiniSearch<Omit<Package, 'version' | 'license' | 'logoUrls' | 'screenshotUrls' | 'provider' | 'website' | 'monthlyDownloads' | 'userRating' | 'userRatingCount' | 'advisoryRating' | 'price' | 'source' | 'value'>>>(new MiniSearch({
        fields        : [
            'id',
            'displayName',
            'description',
            'provider',
        ],
        storeFields   : [
            'id',
            'displayName',
            'description',
            'version',
            'license',
            'logoUrls',
            'screenshotUrls',
            'provider',
            'website',
            'monthlyDownloads',
            'userRating',
            'userRatingCount',
            'advisoryRating',
            'price',
            'source',
            'value',
        ],
        searchOptions : {
            fuzzy : SEARCH_FUZZINESS,
        },
    }));

    const [ isPending, startTransition, ] = useTransition();

    const theme = useTheme();

    const { t, } = useTranslation();

    const search = () => searchEngine.current.search(searchKeyword).map(result => ({
        id              : result.id,
        displayName     : result.displayName,
        description     : result.description,
        version         : result.version,
        license         : result.license,
        logoUrls        : result.logoUrls,
        screenshotUrls  : result.screenshotUrls,
        provider        : result.provider,
        website         : result.website,
        monthlyDownloads: result.monthlyDownloads,
        userRating      : result.userRating,
        userRatingCount : result.userRatingCount,
        advisoryRating  : result.advisoryRating,
        price           : result.price,
        source          : result.source,
        value           : result.value,
    }));

    const handleSearch = (keyword? : string) => {
        setSearchKeyword(keyword ?? '');
    };

    const handleCreateBundleOpen = async () => {
        if (isAuthenticated) {
            setIsCreateBundleOpen(true);
        } else {
            await loginWithRedirect();
        }
    };

    const handleCreateBundleClose = () => setIsCreateBundleOpen(false);

    const handleMyBundlesOpen = () => setIsMyBundleOpen(true);

    const handleMyBundlesClose = () => setIsMyBundleOpen(false);

    const handleCartOpen = () => setIsCartOpen(true);

    const handleCartClose = () => setIsCartOpen(false);

    const handleDisclaimerOpen = () => {
        setIsDocumentOpen(true);
        setSelectedDocumentIndex(0);
    };

    const handlePrivacyOpen = () => {
        setIsDocumentOpen(true);
        setSelectedDocumentIndex(1);
    };

    const handleTermsOpen = () => {
        setIsDocumentOpen(true);
        setSelectedDocumentIndex(2);
    };

    const handleDocumentClose = () => setIsDocumentOpen(false);

    const handleSignOut = () => logout({
        logoutParams : {
            returnTo : window.location.origin,
        },
    });

    useEffect(() => {
        getIdTokenClaims().then(claims => setIdToken(claims?.__raw)).catch(handleError);
    }, [ getIdTokenClaims, ]);

    useEffect(() => {
        searchEngine.current.removeAll();

        if (caskData   && (filters.length === 0 || filters.includes(SearchFilter.Apps)))   searchEngine.current.addAll(caskData);
        if (searchData && (filters.length === 0 || filters.includes(SearchFilter.Apps)))   searchEngine.current.addAll(searchData);
        if (tweakData  && (filters.length === 0 || filters.includes(SearchFilter.Tweaks))) searchEngine.current.addAll(tweakData);

        if (coreData && (filters.length === 0 || filters.includes(SearchFilter.Packages))) coreData.filter(({
            id,
        }) => !searchEngine.current.has(id)).forEach(pkg => searchEngine.current.add(pkg));

        if (bundleData && (filters.length === 0 || filters.includes(SearchFilter.Bundles))) searchEngine.current.addAll(bundleData.map(bundle => ({
            id          : bundle.id,
            displayName : bundle.displayName!,
            description : bundle.description,
        })));

        if (searchKeyword.length < MIN_SEARCH_LENGTH) {
            setMatchedPackages(undefined);
        } else {
            startTransition(() => setMatchedPackages(search()));
        }
    }, [ filters, bundleData, caskData, coreData, searchData, tweakData, searchKeyword, ]);

    useEffect(() => {
        setIsLoading(!bundleData || !caskData || !coreData || !tweakData || !!bundleError || !!caskError || !!coreError || !!tweakError);
    }, [ bundleData, caskData, coreData, searchData, tweakData, bundleError, caskError, coreError, searchError, tweakError, ]);

    useEffect(() => bundleError && handleError(bundleError), [ bundleError, ]);
    useEffect(() => coreError   && handleError(coreError),   [ coreError,   ]);
    useEffect(() => caskError   && handleError(caskError),   [ caskError,   ]);
    useEffect(() => searchError && handleError(searchError), [ searchError, ]);
    useEffect(() => tweakError  && handleError(tweakError),  [ tweakError,  ]);

    return (
        <>
            <Screen>
                <TopBar>
                    <Branding>
                        <img
                            width={48}
                            height={48}
                            alt={t('app.name')}
                            src='/images/logo.png' />
                        <Typography
                            marginX={1}
                            variant='h5'>
                            {t('app.name')}
                        </Typography>
                    </Branding>
                    <Shortcut anchor='section-apps'>{t('shortcut.apps')}</Shortcut>
                    <Shortcut anchor='section-packages'>{t('shortcut.packages')}</Shortcut>
                    <Shortcut anchor='section-tweaks'>{t('shortcut.tweaks')}</Shortcut>
                    <Shortcut anchor='section-bundles'>{t('shortcut.bundles')}</Shortcut>
                    <Shortcut
                        sx={{
                            display : isAuthenticated ? undefined : 'none',
                        }}
                        onClick={handleMyBundlesOpen}>
                        {t('user.bundles')}
                    </Shortcut>
                    <Shortcut
                        sx={{
                            display : isAuthenticated ? undefined : 'none',
                        }}
                        onClick={handleSignOut}>
                        {t('user.sign_out')}
                    </Shortcut>
                    <Shortcut
                        sx={{
                            display : isAuthenticated ? 'none' : undefined,
                        }}
                        onClick={loginWithRedirect}>
                        {t('user.sign_in_sign_up')}
                    </Shortcut>
                    <Action
                        ariaLabel='cart'
                        badge={packages.length}
                        mode='floating'
                        color='primary'
                        icon={<CartIcon />}
                        onClick={handleCartOpen}>
                        <SpeedDialAction
                            sx={{
                                whiteSpace : 'nowrap',
                            }}
                            tooltipOpen
                            tooltipTitle={t('action.download')}
                            icon={<CloudDownloadIcon />}
                            onClick={handleCartOpen} />
                        <SpeedDialAction
                            sx={{
                                whiteSpace : 'nowrap',
                            }}
                            tooltipOpen
                            tooltipTitle={t(isAuthenticated ? 'action.create_bundle' : 'action.create_bundle_requires_sign_in')}
                            icon={<AddIcon />}
                            onClick={handleCreateBundleOpen} />
                    </Action>
                </TopBar>
                <SearchSection
                    isLoading={isLoading || isPending}
                    onSearch={handleSearch} />
                <EmptySection sx={{
                    display : !isLoading && searchKeyword.length >= MIN_SEARCH_LENGTH && matchedPackages && matchedPackages.length === 0 ? 'block' : 'none',
                }}>
                    {t('search.no_results', {
                        searchKeyword,
                    })}
                </EmptySection>
                <GridViewSection
                    sx={{
                        display : !isLoading && searchKeyword.length >= MIN_SEARCH_LENGTH && matchedPackages && matchedPackages.length > 0 ? 'block' : 'none',
                    }}
                    title={t(matchedPackages?.length ?? 0 > SEARCH_MAX_RESULTS ? 'search.top_results' : 'search.results', {
                        cap   : SEARCH_MAX_RESULTS,
                        count : matchedPackages?.length ?? 0,
                        searchKeyword,
                    })}
                    packages={(matchedPackages ?? []).slice(0, SEARCH_MAX_RESULTS)} />
                <a id='section-apps' />
                <GridViewSection
                    background={theme.palette.action.hover}
                    title={t('package.popular_apps')}
                    maxRows={2}
                    packages={POPULAR_APPS} />
                <a id='section-packages' />
                <GridViewSection
                    background={theme.palette.action.selected}
                    title={t('package.popular_packages')}
                    maxRows={2}
                    packages={POPULAR_PACKAGES} />
                <a id='section-tweaks' />
                <GridViewSection
                    background={theme.palette.action.hover}
                    title={t('package.popular_tweaks')}
                    maxRows={1}
                    packages={POPULAR_TWEAKS} />
                <a id='section-bundles' />
                <GridViewSection
                    sx={{
                        display : (bundleData ?? []).length > 0 ? 'block' : 'none',
                    }}
                    background={theme.palette.action.selected}
                    title={t('package.popular_bundles')}
                    maxRows={1}
                    bundles={(bundleData ?? []).slice().sort((left, right) => (right.viewCount ?? 0) - (left.viewCount ?? 0))} />
                <Footer sx={{
                    paddingY : 2,
                }}>
                    <FooterLink
                        sx={{
                            cursor : 'default',
                        }}
                        key='copyright'>
                        <Typography
                            color='white'
                            variant='caption'>
                            {t('app.copyright', {
                                year : new Date().getFullYear(),
                            })}
                        </Typography>
                    </FooterLink>
                    <FooterLink
                        key='terms'
                        onClick={handleTermsOpen}>
                        <Typography
                            color='grey.400'
                            variant='caption'>
                            {t('footer.terms')}
                        </Typography>
                    </FooterLink>
                    <FooterLink
                        key='privacy'
                        onClick={handlePrivacyOpen}>
                        <Typography
                            color='grey.400'
                            variant='caption'>
                            {t('footer.privacy')}
                        </Typography>
                    </FooterLink>
                    <FooterLink
                        key='disclaimer'
                        onClick={handleDisclaimerOpen}>
                        <Typography
                            color='grey.400'
                            variant='caption'>
                            {t('footer.disclaimer')}
                        </Typography>
                    </FooterLink>
                </Footer>
            </Screen>
            <CartPage
                open={isCartOpen}
                onClose={handleCartClose} />
            <CreateBundlePage
                open={isCreateBundleOpen}
                idToken={idToken}
                onClose={handleCreateBundleClose} />
            {idToken && (
                <MyBundlesPage
                    open={isMyBundleOpen}
                    idToken={idToken}
                    onClose={handleMyBundlesClose} />
            )}
            <DocumentPage
                open={isDocumentOpen}
                title={t(DOCUMENTS[selectedDocumentIndex].title)}
                docPath={DOCUMENTS[selectedDocumentIndex].docPath}
                onClose={handleDocumentClose} />
            <Loading
                show={isLoading}
                message={t('app.loading')} />
        </>
    );
};
