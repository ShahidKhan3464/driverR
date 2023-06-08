import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import { StyledSelectField } from './style';
import { StyledDialogContent } from './style';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Index = ({ open, setOpen, handleStatus }) => {
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    const handleUpdate = () => {
        setOpen(false)
        handleStatus()
    }

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
                <div className='icon'>
                    <img src='/images/status-icon.svg' alt='status-icon' />
                </div>

                <h3>Change Status!</h3>
                <StyledSelectField>
                    <FormControl fullWidth
                        variant='outlined'
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            '& fieldset': {
                                border: '2px solid #79747E'
                            },
                        }}
                    >
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </StyledSelectField>

                <div className='btn-container'>
                    <button className='cancel-btn' type='button' onClick={() => setOpen(false)}>Cancel</button>
                    <button className='delete-btn' type='button' onClick={handleUpdate}>Update</button>
                </div>
            </StyledDialogContent>
        </Dialog>
    )
}

export default Index