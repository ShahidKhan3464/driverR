import styled from "styled-components";
import { primaryBlue } from "components/globaStyle";

export const StyledDialogContent = styled.div`
    display: flex;
    margin-top: 50px;
    align-items: center;
    flex-direction: column;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .delete-icon {
        width: 53px;
        height: 61px;
    }

    .status-icon {
        width: 68px;
        height: 68px;
    }

    .logout-icon {
        width: 53px;
        height: 61px;
    }

    .reject-icon, .block-icon {
        width: 56px;
        height: 56px;
    }

    h3 {
        margin: 0;
        font-size: 28px;
        font-weight: 500;
        line-height: 34px;
        font-style: normal;
        text-align: center;
        letter-spacing: 0.0038em;
        font-family: SF Pro Text;
    }

    .content {
        gap: 25px;
        width: 100%;
        display: flex;
        margin: 25px 0;
        flex-direction: column;
    }

    .text {
        margin-top: 16px;
        max-width: 363px;
        margin-bottom: 40px;

        p {
            margin: 0;
            color: #374151;
            font-size: 18px;
            margin-top: 12px;
            font-weight: 400;
            line-height: 132%;
            font-style: normal;
            text-align: center;
            font-family: SF Pro Text;
        }
    }

    .btn-container {
        gap: 16px;
        display: flex;
        flex-wrap: wrap;
        padding: 0 11px;
        align-items: center;

        @media screen and (max-width: 425px) {
            justify-content: center;
        }

        button {
            padding: 0;
            width: 175px;
            height: 42px;
            outline: none;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            line-height: 132%;
            border-radius: 8px;
            font-style: normal;
            font-family: SF Pro Text;
        }

        .cancel-btn {
            color: ${primaryBlue};
            background: transparent;
            border: 1px solid ${primaryBlue};
        }

        .delete-btn {
            border: none;
            color: #FFFFFF;
            background: #EF4444;
        }

        .update-btn, .logout-btn, .reject-btn, .block-btn, .export-btn {
            border: none;
            color: #FFFFFF;
            background: ${primaryBlue};
        }
    }
`