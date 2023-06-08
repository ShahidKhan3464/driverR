import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey600 } from 'components/globaStyle';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';

const Index = ({ id = null, userId = null, status = null, trscDetails = null, options, handleTableMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const isMobile = useMediaQuery({ maxWidth: 520 })

    const handleMenuItem = (e, option) => {
        setAnchorEl(null)
        e.stopPropagation()
        handleTableMenu(id, userId, status, option, trscDetails)
    }

    return (
        <React.Fragment>
            <IconButton
                aria-haspopup="true"
                sx={{ width: '3px' }}
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'long-menu' : undefined}
                onClick={(e) => {
                    e.stopPropagation()
                    setAnchorEl(e.currentTarget)
                }}
            >
                <img src='/images/menu-icon.svg' alt='menu-icon' />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ style: { padding: 0 } }}
                PaperProps={{
                    style: {
                        width: '170px',
                        borderRadius: '12px',
                        padding: '20px 20px 0',
                        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
                        ...(isMobile && {
                            width: '130px',
                            padding: '15px 15px 0',
                        }),
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={(e) => handleMenuItem(e, option.text)}
                        sx={{
                            gap: '20px',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '21px',
                            padding: '0 0 20px',
                            fontStyle: 'normal',
                            borderBottom: 'none',
                            fontFamily: 'SF Pro Text',
                            letterSpacing: '-0.0031em',
                            color: option.text === 'Delete' ? '#EF4444' : grey600,
                            "&:hover": { backgroundColor: "transparent", color: option.text === 'Delete' ? '#EF4444' : 'inherit' },

                            ...(isMobile && {
                                gap: '10px',
                                fontSize: '14px',
                                minHeight: '40px',
                                padding: '0 0 10px',
                            }),
                        }}
                    >
                        <img src={option.icon} alt={option.text} />
                        <span>{option.text}</span>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}

export default Index