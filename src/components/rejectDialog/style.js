import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import { primaryBlue } from "components/globaStyle";

export const StyledDialogContent = styled.div`
    .content {
        &_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &_form {
            form {
                gap: 32px;
                display: flex;
                margin-top: 36px;
                flex-direction: column;

                @media screen and (max-width: 520px) {
                    gap: 16px;
                    margin-top: 18px;
                }

                .field-control {
                    position: relative;
                    
                    .textarea {
                        .MuiInputBase-root {
                            height: 187px;
                            align-items: flex-start;
                        }
                    }
                }

                .btn-container {
                    gap: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    button {
                        border: none;
                        outline: none;
                        font-size: 13px;
                        cursor: pointer;
                        font-weight: 500;
                        line-height: 18px;
                        padding: 10px 15px;
                        font-style: normal;
                        border-radius: 6px;
                        background: transparent;
                        font-family: SF Pro Text;
                        letter-spacing: -0.0008em;

                        @media screen and (max-width: 520px) {
                           width: 100%;
                        }
                    }

                    .cancel-btn {
                        color: ${primaryBlue};
                        border: 1px solid ${primaryBlue};
                    }

                    .send-btn {
                        color: #F9FAFB;
                        background: ${primaryBlue};
                    }
                }
            }
        }
    }
`

export const StyledFormControl = styled(FormControl)`
    & .MuiInputLabel-root {
        color: #49454F;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        letter-spacing: 0.5px;
        font-family: SF Pro Text;
    }

    & .MuiInputLabel-outlined.MuiInputLabel-shrink {
        font-weight: 400;
        font-style: normal;
        font-family: SF Pro Text;
        color: ${props => (props.error ? "#B3261E" : primaryBlue)};
    }

    & .MuiOutlinedInput-input {
        color: #49454F;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        letter-spacing: 0.5px;
        font-family: SF Pro Text;
    }

    & .MuiOutlinedInput-root {
        & fieldset {
            border: 1px solid #79747E;
        }

        &:hover fieldset {
            border: ${props => (props.error ? "2px solid #B3261E" : `2px solid ${primaryBlue}`)};
        }

        & fieldset legend {
            width: ${props => props.width};
        }

        &.Mui-focused fieldset {
            border: ${props => (props.error ? "2px solid #B3261E" : `2px solid ${primaryBlue}`)};
        }
    }
`