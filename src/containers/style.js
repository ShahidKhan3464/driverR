import styled from "styled-components";
import { Layout } from 'antd';
const { Header } = Layout;

export const StyledHeader = styled(Header)(() => ({
    height: 70,
    paddingInline: 21,
    background: '#FFFFFF',

    '@media screen and (max-width: 991px)': {
        display: 'none',
    }
}))

export const StyledMbHeader = styled.div`
    display: flex;
    padding: 24px;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 991px) {
        display: none;
    }

    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .hamburger-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FFFFFF;
    }

    button {
        padding: 0;
        border: none;
        outline: none;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    .header-icons {
        gap: 24px;
        height: 100%;
        float: right;
        display: flex;
        align-items: center;

        @media screen and (max-width: 520px) {
            gap: 15px;
        }
    }
`