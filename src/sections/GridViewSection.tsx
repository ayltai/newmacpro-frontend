
import React, { ReactElement, useState, } from 'react';

import { CardContent, CardDescription, CardTitle, GridView, ListView, Section, SectionContent, SectionTitle, SelectableCardView, SelectableCardViewProps, } from '../components';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { ViewBundlePage, } from '../pages';
import { addPackage, addPackages, removePackage, removePackages, } from '../states';
import { Bundle, Package, } from '../types';

export const GridViewSection = ({
    idToken,
    title,
    maxRows = Number.MAX_SAFE_INTEGER,
    packages,
    bundles,
    onBundlesUpdated,
    ...rest
} : {
    idToken?          : string,
    title             : string,
    maxRows?          : number,
    packages?         : Package[],
    bundles?          : Bundle[],
    onBundlesUpdated? : () => void,
    [ rest : string ] : any,
}) => {
    const [ selectedBundleId, setSelectedBundleId, ] = useState<string | undefined>();

    const dispatch = useAppDispatch();

    const { packages : selectedPackages, } = useAppSelector(state => state.cart);

    const handleViewBundleClose = () => {
        setSelectedBundleId(undefined);

        if (onBundlesUpdated) onBundlesUpdated();
    };

    const children : ReactElement<SelectableCardViewProps>[] = [];

    if (packages) packages.map(pkg => {
        const handleSelect = (selected : boolean) => dispatch(selected ? addPackage(pkg) : removePackage(pkg));

        return (
            <SelectableCardView
                key={pkg.id}
                sx={{
                    height : '100%',
                }}
                align='center'
                selected={selectedPackages.some((selectedPackage : Package) => selectedPackage.id === pkg.id)}
                onSelect={handleSelect}>
                <CardTitle title={pkg.displayName}>{pkg.displayName}</CardTitle>
                <CardDescription title={pkg.description}>{pkg.description}</CardDescription>
            </SelectableCardView>
        );
    }).forEach(child => children.push(child));

    if (bundles) bundles.map(bundle => {
        const handleMoreInfo = () => setSelectedBundleId(bundle.id);

        const handleSelect = (selected : boolean) => dispatch(selected ? addPackages(bundle.packages) : removePackages(bundle.packages));

        return (
            <SelectableCardView
                key={bundle.id}
                sx={{
                    height : '100%',
                }}
                align='center'
                selected={bundle.packages.every(pkg => selectedPackages.some((selectedPackage : Package) => selectedPackage.id === pkg.id))}
                onMoreInfo={handleMoreInfo}
                onSelect={handleSelect}>
                <CardTitle title={bundle.displayName}>{bundle.displayName}</CardTitle>
                <CardDescription title={bundle.description}>{bundle.description}</CardDescription>
                <CardContent>
                    <ListView
                        maxRows={4}
                        packages={bundle.packages} />
                </CardContent>
            </SelectableCardView>
        );
    }).forEach(child => children.push(child));

    return (
        <>
            <Section {...rest}>
                <SectionTitle marginTop={6}>{title}</SectionTitle>
                <SectionContent>
                    <GridView maxRows={maxRows}>
                        {children}
                    </GridView>
                </SectionContent>
            </Section>
            {selectedBundleId && (
                <ViewBundlePage
                    open
                    idToken={idToken}
                    onClose={handleViewBundleClose}
                    bundleId={selectedBundleId} />
            )}
        </>
    );
};
