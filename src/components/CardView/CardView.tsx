import { Box, Button, Card, CardActionArea, CardActions, CardContent, } from '@mui/material';
import React, { FC, ReactElement, } from 'react';
import { useTranslation, } from 'react-i18next';

import { default as Content, CardContentProps as ContentProps, } from '../CardContent';
import { default as CardDescription, CardDescriptionProps, } from '../CardDescription';
import { default as CardImage, CardImageProps, } from '../CardImage';
import { default as CardTitle, CardTitleProps, } from '../CardTitle';
import type { CardViewProps, } from './CardView.types';

/**
 * CardViews contain content and actions about a single subject.
 * @param align The alignment of the content.
 * @param children The content of the component.
 * @param onClick An event handler called when the component is clicked.
 * @param onMoreInfo An event handler called when the "More Info" button is clicked.
 * @param rest The other props passed down to the `CardView` component.
 */
const CardView : FC<CardViewProps> = ({
    align,
    children,
    onClick,
    onMoreInfo,
    ...rest
}) => {
    const { t, } = useTranslation();

    let title       : ReactElement<CardTitleProps>       | undefined;
    let description : ReactElement<CardDescriptionProps> | undefined;
    let image       : ReactElement<CardImageProps>       | undefined;

    const contents : ReactElement<ContentProps>[] = [];

    if (children) {
        if (Array.isArray(children)) {
            title       = children.find(child => child.type === CardTitle)       as ReactElement<CardTitleProps>;
            description = children.find(child => child.type === CardDescription) as ReactElement<CardDescriptionProps>;
            image       = children.find(child => child.type === CardImage)       as ReactElement<CardImageProps>;

            contents.push(...children.filter(child => child.type === Content));
        } else {
            if (children.type === CardTitle)       title       = children as ReactElement<CardTitleProps>;
            if (children.type === CardDescription) description = children as ReactElement<CardDescriptionProps>;
            if (children.type === CardImage)       image       = children as ReactElement<CardImageProps>;

            if (children.type === Content) contents.push(children as ReactElement<ContentProps>);
        }
    }

    return (
        <Card
            variant='elevation'
            {...rest}>
            <Box sx={{
                height        : '100%',
                display       : 'flex',
                flexDirection : 'column',
            }}>
                <Box sx={{
                    flex : 1,
                }}>
                    <CardActionArea
                        sx={{
                            height         : '100%',
                            display        : 'flex',
                            alignItems     : 'start',
                            justifyContent : align,
                        }}
                        onClick={onClick}>
                        <Box sx={{
                            width         : '100%',
                            display       : 'flex',
                            flexDirection : 'column',
                        }}>
                            {image}
                            <CardContent sx={{
                                width     : '100%',
                                textAlign : align,
                            }}>
                                {title}
                                {description}
                                <Box sx={{
                                    textAlign : 'left',
                                }}>
                                    {contents}
                                </Box>
                            </CardContent>
                        </Box>
                    </CardActionArea>
                </Box>
                <CardActions sx={{
                    display   : 'block',
                    textAlign : align,
                }}>
                    <Button
                        size='small'
                        variant='text'
                        color='info'
                        onClick={onMoreInfo}>
                        {t('package.more_info')}
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default CardView;
