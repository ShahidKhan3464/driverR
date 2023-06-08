import styled from "styled-components";
import { grey200 } from "components/globaStyle";
import { grey400 } from "components/globaStyle";

export const StyledTableSearchField = styled.div`
    width: 100%;
    max-width: 328px;

    @media screen and (max-width: 520px) {
        max-width: inherit;
    }

    .field {
        gap: 8px;
        height: 40px;
        display: flex;
        border-radius: 8px;
        padding-left: 12px;
        align-items: center;
        border: 1px solid ${grey200};

        input {
            padding: 0;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 13px;
            font-weight: 400;
            color: ${grey400};
            line-height: 18px;
            font-style: normal;
            background: transparent;
            font-family: SF Pro Text;
            letter-spacing: -0.0008em;

            &::placeholder {
                font-size: 13px;
                font-weight: 400;
                line-height: 18px;
                color: ${grey400};
                font-style: normal;
                font-family: SF Pro Text;
                letter-spacing: -0.0008em;
            }
        }
    }
`