import styled from "styled-components";

export const StyledPara = styled.p`
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    font-style: normal;
    margin-bottom: 24px;
    font-family: SF Pro Text;
    letter-spacing: -0.0031em;
    color: ${props => props.color && props.color};

    @media screen and (max-width: 475px) {
        font-size: 14px;
        margin-bottom: 20px;
    }
`