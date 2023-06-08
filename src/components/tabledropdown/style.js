import styled from 'styled-components';
import Button from '@mui/material/Button';
import { grey300 } from 'components/globaStyle';

export const StyledButton = styled(Button)({
    fontStyle: 'normal',
    height: '40px !important',
    fontSize: '13px !important',
    fontWeight: '500 !important',
    lineHeight: '18px !important',
    padding: '6px 12px !important',
    borderRadius: '6px !important',
    textTransform: 'none !important',
    fontFamily: 'SF Pro Text !important',
    letterSpacing: '-0.0008em !important',
    border: `1px solid ${grey300} !important`,
    '&:hover': {
        background: 'transparent !important',
    },
    '@media screen and (max-width: 520px)': {
        height: '35px !important',
        fontSize: '11px !important',
    }
})
