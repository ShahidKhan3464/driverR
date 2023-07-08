import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { primaryBlue } from "components/globaStyle";

export const StyledTextField = styled(TextField)((props) => ({
    '& label': {
        fontWeight: 400,
        fontSize: '16px',
        color: '#49454F',
        lineHeight: '24px',
        fontStyle: 'normal',
        letterSpacing: '0.5px',
        fontFamily: 'SF Pro Text',
        '@media screen and (max-width: 475px)': {
            fontSize: '14px',
        }
    },
    '& label.Mui-focused': {
        fontWeight: 400,
        fontStyle: 'normal',
        fontFamily: 'SF Pro Text',
        color: props.error ? '#B3261E' : primaryBlue,
    },
    '& .MuiOutlinedInput-input': {
        fontWeight: 400,
        fontSize: '16px',
        color: '#49454F',
        lineHeight: '24px',
        fontStyle: 'normal',
        letterSpacing: '0.5px',
        fontFamily: 'SF Pro Text',
        '@media screen and (max-width: 475px)': {
            fontSize: '14px',
        }
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1px solid #79747E',
        },
        '&:hover fieldset': {
            border: props.error ? '2px solid #B3261E' : `2px solid ${primaryBlue}`,
        },
        '& fieldset legend': {
            width: props.width,
            '@media screen and (max-width: 475px)': {
                width: props.mbWidth,
            }
        },
        '&.Mui-focused fieldset': {
            border: props.error ? '2px solid #B3261E' : `2px solid ${primaryBlue}`,
        },

        "& :-webkit-autofill": {
            boxShadow: '0 0 0 30px white inset',
        }
    },
    '& .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button, & .MuiOutlinedInput-input[type="number"]::-webkit-outer-spin-button': {
        margin: 0,
        '-webkit-appearance': 'none',
    },
    '& .MuiOutlinedInput-input[type="number"]': {
        inputMode: 'numeric',
        '-moz-appearance': 'textfield',
    },
}))