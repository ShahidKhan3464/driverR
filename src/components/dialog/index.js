import React from 'react';
import Dialog from '@mui/material/Dialog';
import { StyledDialogContent } from './style';
import IconButton from '@mui/material/IconButton';

const Index = ({ open, content, setOpen }) => {

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    borderRadius: '12px',
                    padding: '16px 18px 24px',
                    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)'
                },
            }}
        >
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    top: 16,
                    right: 16,
                    padding: 0,
                    position: 'absolute',
                }}
            >
                <img src='/images/pop-cross-icon.svg' alt='cross-icon' />
            </IconButton>
            <StyledDialogContent>
                {content}
            </StyledDialogContent>
        </Dialog>
    )
}

export default Index