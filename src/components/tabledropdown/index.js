import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { StyledButton } from './style';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';
import { grey400, grey600 } from 'components/globaStyle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Index = ({ name, options, defaultValue, handleFilterChange }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isSelect, setIsSelect] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [initialValue, setInitialValue] = useState(defaultValue)
    const open = Boolean(anchorEl)

    const handleMenuItem = (value, text) => {
        setIsSelect(true)
        setAnchorEl(null)
        setInitialValue(text)
        handleFilterChange(name, value)
    }

    const handleClearFilter = (e) => {
        setIsSelect(false)
        e.stopPropagation()
        handleFilterChange(name, '')
        setInitialValue(defaultValue)
    }

    return (
        <React.Fragment>
            <StyledButton
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ color: !isSelect ? grey400 : grey600 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-controls={open ? 'demo-customized-menu' : undefined}
                endIcon={!isSelect ? <KeyboardArrowDownIcon /> : <img src='/images/clear-filter.svg' alt='clear-filter' onClick={e => handleClearFilter(e)} />}
            >
                {initialValue}
            </StyledButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ style: { padding: 0 } }}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        padding: '20px 20px 0',
                        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
                        ...(isMobile && {
                            width: '100px',
                            padding: '15px 15px 0',
                        }),
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItem(option.value, option.text)}
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
                            "&:hover": { backgroundColor: "transparent", color: 'inherit' },

                            ...(isMobile && {
                                gap: '10px',
                                fontSize: '14px',
                                minHeight: '40px',
                                padding: '0 0 10px',
                            }),
                        }}
                    >
                        <span>{option.text}</span>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}

export default Index