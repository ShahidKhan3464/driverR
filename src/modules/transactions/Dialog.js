import React, { useState } from 'react';
import ViewReceipt from './Receipt';
import Radio from '@mui/material/Radio';
import Dialog from '@mui/material/Dialog';
import { StyledExportContent } from './style';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import { primaryBlue } from 'components/globaStyle';
import FormControlLabel from '@mui/material/FormControlLabel';

const Index = ({ open, data, dialogType, setOpen }) => {
    const [value, setValue] = useState('csv')

    const radiosButton = [
        { value: 'csv', label: 'CSV' },
        { value: 'pdf', label: 'PDF' }
    ]

    const exportContent = () => {
        return (
            <React.Fragment>
                <div className='export-icon'>
                    <img src='/images/export-as.svg' alt='export-as' />
                </div>

                <div className='content'>
                    <h3>Export as</h3>
                    <RadioGroup
                        row
                        value={value}
                        sx={{ justifyContent: 'center' }}
                        onChange={(e) => setValue(e.target.value)}
                    >
                        {radiosButton.map((item) => {
                            return (
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#A2ACBD',
                                                '&.Mui-checked': {
                                                    color: primaryBlue,
                                                    'svg:last-child': {
                                                        transform: 'scale(1.3)'
                                                    }
                                                },
                                            }}
                                        />
                                    }
                                    sx={{
                                        marginLeft: '3px',
                                        marginRight: '15px',
                                        '& .MuiFormControlLabel-label': {
                                            color: '#3E4756',
                                            fontSize: '16px',
                                            fontWeight: '400',
                                            lineHeight: '121.4%',
                                            fontFamily: 'Poppins',
                                        },
                                    }}
                                />
                            )
                        })}
                    </RadioGroup>
                </div>

                <div className='btn-container'>
                    <button className='cancel-btn' type='button' onClick={() => setOpen(false)}>Cancel</button>
                    <button className='export-btn' type='button'>Export</button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    overflowY: 'hidden',
                    borderRadius: '12px',
                    width: dialogType === 'view' && '100%',
                    maxWidth: dialogType === 'view' && '669px',
                    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
                    padding: dialogType === 'export' && '16px 18px 24px',
                },
            }}
        >
            {dialogType === 'export' && (
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
            )}

            {dialogType === 'view'
                ? <ViewReceipt data={data} />
                : dialogType === 'export' && (
                    <StyledExportContent>
                        {exportContent()}
                    </StyledExportContent>
                )
            }
        </Dialog>
    )
}

export default Index