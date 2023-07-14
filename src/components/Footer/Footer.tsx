import { Box, Container, Unstable_Grid2 as Grid, } from '@mui/material';
import React, { FC, ReactElement, } from 'react';

import { default as FooterLink, FooterLinkProps, } from '../FooterLink';
import type { FooterProps, } from './Footer.types';

/**
 * Footers show additional information or navigation at the bottom of a page.
 * @param background The background styles of the component.
 * @param maxWidth The maximum width of the component.
 * @param children The children of the footer, normally FooterLink.
 * @param rest The other props that get passed to the component.
 */
const Footer : FC<FooterProps> = ({
    background = 'black',
    maxWidth   = 'lg',
    children,
    ...rest
}) => {
    const links : ReactElement<FooterLinkProps>[] = [];

    if (children) {
        if (Array.isArray(children)) {
            links.push(...children.filter(child => child.type === FooterLink));
        } else {
            if (children.type === FooterLink) links.push(children);
        }
    }

    return (
        <Box
            sx={{
                background,
            }}
            width='100%'>
            <Container maxWidth={maxWidth}>
                <Grid
                    container
                    justifyContent='space-evenly'
                    textAlign='center'
                    {...rest}>
                    {links.map(link => (
                        <Grid
                            key={link.key}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}>
                            {link}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
