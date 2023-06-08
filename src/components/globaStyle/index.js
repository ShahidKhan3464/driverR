import { Input } from "antd";
import styled from "styled-components";
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// colors
export const grey200 = '#E5E7EB'
export const grey300 = '#D1D5DB'
export const grey400 = '#9CA3AF'
export const grey500 = '#6B7280'
export const grey600 = '#4B5563'
export const grey700 = '#616161'
export const grey800 = '#1F2937'
export const grey900 = '#111827'
export const infoLink = '#1153DA'
export const primaryBlue = '#132476'
export const secondaryBlue = '#78B3F5'

export const StyledHeading = styled.h3`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${grey900};
    line-height: 25px;
    margin-bottom: 8px;
    font-style: normal;
    font-family: SF Pro Text;
    letter-spacing: -0.0045em;

    @media screen and (max-width: 475px) {
        font-size: 16px;
    }
`

export const StyledAntInput = styled(Input)`
    height: 56px;
    color: #49454F;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    font-style: normal;
    border-radius: 4px;
    letter-spacing: 0.5px;
    font-family: SF Pro Text;
    border: 1px solid #79747E;

    ::placeholder {
        color: #49454F;
    }
    
    &:hover, &:focus {
        box-shadow: none;
        border: 1px solid #79747E;
    }
`

export const PrimaryButton = styled.button`
    padding: 0;
    width: 100%;
    border: none;
    height: 40px;
    display: flex;
    outline: none;
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    line-height: 20px;
    font-style: normal;
    align-items: center;
    border-radius: 100px;
    letter-spacing: 0.1px;
    justify-content: center;
    font-family: SF Pro Text;
    background: ${primaryBlue};
`

export const StyledTableHeading = styled.h2`
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    color: ${grey900};
    line-height: 34px;
    font-style: normal;
    letter-spacing: 0.0038em;
    font-family: SF Pro Text;

    @media screen and (max-width: 520px) {
        font-size: 16px;
    }
`

export const StyledStatus = styled.span`
    height: 25px;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    font-style: normal;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    font-family: SF Pro Text;
    letter-spacing: -0.0045em;
    color: ${props => props.color};
    width: ${props => props.width};
    background: ${props => props.background};
`

export const StyledTableCell = styled(TableCell)((props) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',
        fontStyle: 'normal',
        padding: '18px 16px',
        whiteSpace: 'nowrap',
        borderBottom: 'none',
        letterSpacing: '0.1px',
        fontFamily: 'SF Pro Text',
        color: props.color || '#000D1B',
        '@media screen and (max-width: 520px)': {
            fontSize: '12px',
        }
    },
    [`&.${tableCellClasses.body}`]: {
        lineHeight: '20px',
        fontStyle: 'normal',
        whiteSpace: 'nowrap',
        padding: '18px 16px',
        letterSpacing: '0.1px',
        fontFamily: 'SF Pro Text',
        fontSize: props.size || '14px',
        color: props.color || '#5A5A5A',
        fontWeight: props.weight || '400',
        borderBottom: '1px solid #DADADA',
        '@media screen and (max-width: 520px)': {
            fontSize: '12px',
        }
    },
}))

export const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: '#F3F4F6',
    },
}))

export const StyledNoResultsFound = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 520px) {
        height: auto;
        width: calc(100vw - 100px);
    }

    .container {
        gap: 24px;
        display: flex;
        flex-direction: column;
    }
`

export const StyledLoadingContainer = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 520px) {
        height: auto;
        width: calc(100vw - 100px);
    }
`

export const FieldErrorMessage = styled.p`
    margin: 0;
    top: 100%;
    color: #B3261E;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
    position absolute;
    line-height: 16px;
    font-style: normal;
    letter-spacing: 0.4px;
    font-family: SF Pro Text;
`