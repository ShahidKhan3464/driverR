import styled from "styled-components";
import { primaryBlue, grey900 } from "components/globaStyle";

export const StyledDialogContent = styled.div`
    display: flex;
    margin-top: 50px;
    align-items: center;
    flex-direction: column;

    .icon {
        width: 68px;
        height: 68px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
        
    h3 {
        margin: 0;
        font-size: 28px;
        margin-top: 16px;
        font-weight: 500;
        color: ${grey900};
        line-height: 34px;
        font-style: normal;
        text-align: center;
        letter-spacing: 0.0038em;
        font-family: SF Pro Text;
    }    

    .btn-container {
        gap: 16px;
        display: flex;
        padding: 0 11px;
        align-items: center;

        .cancel-btn, .delete-btn {
            padding: 0;
            height: 42px;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            line-height: 132%;
            border-radius: 8px;
            font-style: normal;
            font-family: SF Pro Text;
        }

        .cancel-btn {
            width: 175px;
            color: ${primaryBlue};
            background: transparent;
            border: 1px solid ${primaryBlue};
        }

        .delete-btn {
            width: 175px;
            border: none;
            color: #FFFFFF;
            background: ${primaryBlue};
        }
    }
`
export const StyledSelectField = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 53px;

    .MuiFormLabel-root {
        color: #49454F;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        letter-spacing: 0.5px;
        font-family: SF Pro Text;
    }
`