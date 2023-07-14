import { Close as CloseIcon, } from '@mui/icons-material';
import { Backdrop, Container, Dialog, DialogTitle, DialogContent, IconButton, Slide, } from '@mui/material';
import type { TransitionProps, } from '@mui/material/transitions';
import React, { FC, forwardRef, JSXElementConstructor, ReactElement, Ref, } from 'react';

import { default as PageActions, PageActionsProps, } from '../PageActions';
import { default as PageContent, PageContentProps, } from '../PageContent';
import { default as PageTitle, PageTitleProps, } from '../PageTitle';
import  { PageProps, } from './Page.types';

const TransitionComponent = (
    props : TransitionProps & {
        children : ReactElement<any, string | JSXElementConstructor<any>>,
    },
    ref   : Ref<unknown>) => {
    const { children, } = props;

    return (
        <Slide
            direction='up'
            ref={ref}
            {...props}>
            {children}
        </Slide>
    );
};

const Transition = forwardRef(TransitionComponent);

const Page : FC<PageProps> = ({
    open = false,
    children,
    onClose,
}) => {
    let title   : ReactElement<PageTitleProps>   | undefined;
    let content : ReactElement<PageContentProps> | undefined;
    let actions : ReactElement<PageActionsProps> | undefined;

    if (children) {
        if (Array.isArray(children)) {
            title   = children.find(child => child.type === PageTitle)   as ReactElement<PageTitleProps>;
            content = children.find(child => child.type === PageContent) as ReactElement<PageContentProps>;
            actions = children.find(child => child.type === PageActions) as ReactElement<PageActionsProps>;
        } else {
            if (children.type === PageTitle)   title   = children as ReactElement<PageTitleProps>;
            if (children.type === PageContent) content = children as ReactElement<PageContentProps>;
            if (children.type === PageActions) actions = children as ReactElement<PageActionsProps>;
        }
    }

    const handleClose = () => onClose && onClose();

    return (
        <Backdrop open={open}>
            <Dialog
                fullScreen
                sx={{
                    marginTop : 32,
                }}
                TransitionComponent={Transition}
                open={open}>
                <DialogTitle>
                    {title}
                    {onClose && (
                        <IconButton
                            sx={{
                                position : 'absolute',
                                right    : 8,
                                top      : 8,
                            }}
                            onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
                <DialogContent dividers>
                    <Container maxWidth='lg'>
                        {content}
                    </Container>
                </DialogContent>
                {actions}
            </Dialog>
        </Backdrop>
    );
};

export default Page;
