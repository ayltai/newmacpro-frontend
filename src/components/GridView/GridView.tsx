import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon, } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Unstable_Grid2 as Grid, useMediaQuery, } from '@mui/material';
import React, { Children, FC, ReactElement, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import type { CardViewProps, } from '../CardView';
import type { SelectableCardViewProps, } from '../SelectableCardView';
import type { GridViewProps, } from './GridView.types';

/**
 * A grid layout of CardView components.
 * @param expanded Whether the GridView should be expanded to show all the contents.
 * @param maxRows The maximum number of rows to display.
 * @param children The content of the component. Normally CardView components.
 * @param rest The other props passed down to the component.
 */
const GridView : FC<GridViewProps> = ({
    expanded = false,
    maxRows  = Number.MAX_SAFE_INTEGER,
    children,
    ...rest
}) => {
    const [ isExpanded, setIsExpanded, ] = useState(expanded);

    const { t, } = useTranslation();

    const isSM   = useMediaQuery('(min-width: 600px)');
    const isMD   = useMediaQuery('(min-width: 900px)');
    const isLG   = useMediaQuery('(min-width: 1200px)');

    let limit = maxRows;
    if (isLG) {
        limit = maxRows * 4;
    } else if (isMD) {
        limit = maxRows * 3;
    } else if (isSM) {
        limit = maxRows * 2;
    }

    const elements    = Children.toArray(children).filter(child => child);
    const summaryRows = elements.slice(0, Math.min(elements.length, limit));
    const detailsRows = elements.slice(limit);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const renderItem = (element : ReactElement) => (
        <Grid
            key={element.key}
            xs={12}
            sm={6}
            md={4}
            lg={3}>
            {element}
        </Grid>
    );

    return (
        <Box>
            <Accordion
                sx={{
                    backgroundColor : 'transparent',
                    boxShadow       : 'none',
                }}
                expanded={isExpanded}>
                <AccordionSummary>
                    <Grid
                        container
                        width='100%'
                        padding={2}
                        spacing={2}
                        {...rest}>
                        {summaryRows.map(item => renderItem(item as ReactElement<CardViewProps | SelectableCardViewProps>))}
                    </Grid>
                </AccordionSummary>
                {detailsRows.length > 0 && (
                    <Box sx={{
                        marginTop : -3,
                    }}>
                        <AccordionDetails>
                            <Grid
                                container
                                padding={2}
                                spacing={2}
                                {...rest}>
                                {detailsRows.map(item => renderItem(item as ReactElement<CardViewProps | SelectableCardViewProps>))}
                            </Grid>
                        </AccordionDetails>
                    </Box>
                )}
            </Accordion>
            {detailsRows.length > 0 && (
                <Box
                    marginBottom={6}
                    textAlign='center'>
                    <Button
                        color='info'
                        endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        onClick={toggleExpand}>
                        {t(isExpanded ? 'package.view_less' : 'package.view_all')}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default GridView;
