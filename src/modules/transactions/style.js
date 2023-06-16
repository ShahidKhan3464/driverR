import styled from "styled-components";
import { grey300, grey400, grey600, primaryBlue, infoLink, grey900, grey800 } from "components/globaStyle";

export const ContentContainer = styled.div`
    gap: 24px;
    display: flex;
    margin-left: 272px;
    padding: 20px 24px;
    flex-direction: column;

    @media screen and (max-width: 991px) {
        margin-left: 0;
    }

    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .table {
        padding: 20px;
        background: #FFFFFF;
        border-radius: 16px;
        border: 1px solid #E7E7E7;

        @media screen and (max-width: 520px) {
            padding: 16px;
        }

        &_header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            justify-content: space-between;

            .disabled-btn {
                cursor: not-allowed;
            }
        }

        &_control-elements {
            gap: 12px;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 520px) {
                margin-bottom: 12px;
            }

            &_filterbox {
                gap: 24px;
                display: flex;
                align-items: center;

                @media screen and (max-width: 520px) {
                    gap: 8px;
                }
            }
        }
    }
`

export const StyledExportButton = styled.button`
    gap: 8px;
    border: none;
    outline: none;
    display: flex;
    font-size: 16px;
    cursor: pointer;
    font-weight: 400;
    line-height: 21px;
    font-style: normal;
    color: ${infoLink};
    align-items: center;
    background: transparent;
    font-family: SF Pro Text;
    letter-spacing: -0.0031em;
`

export const StyledDatepickerContainer = styled.div`
    .react-datepicker-wrapper {
        .react-datepicker__input-container  {
            input {
                height: 40px;
                outline: none;
                padding: 0 15px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                line-height: 18px;
                border-radius: 6px;
                font-style: normal;
                font-family: SF Pro Text;
                background-position-x: 75%;
                border: 1px solid ${grey300};
                background-repeat: no-repeat;
                background-position-y: center;
                background-color: transparent;
                width: ${props => props.selectDate ? '120px' : '76px'};
                color: ${props => props.selectDate ? grey600 : grey400};
                background-image: ${props => !props.selectDate ? 'url(/images/down-arrow.svg)' : 'none'};

                ::placeholder {
                    color: ${grey400};
                }

                @media screen and (max-width: 520px) {
                    height: 35px;
                    font-size: 11px;
                }
            }

            .react-datepicker__close-icon {
                &::after {
                    padding: 0;
                    font-size: 20px;
                    color: ${grey600};
                    background: transparent;
                }
            }
        }
    }
`

export const StyledExportContent = styled.div`
    display: flex;
    margin-top: 50px;
    align-items: center;
    flex-direction: column;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .export-icon {
        width: 75px;
        height: 60px;
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

    .btn-container {
        gap: 16px;
        display: flex;
        padding: 0 11px;
        align-items: center;

        button {
            padding: 0;
            width: 175px;
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
            color: ${primaryBlue};
            background: transparent;
            border: 1px solid ${primaryBlue};
        }

        .export-btn {
            border: none;
            color: #FFFFFF;
            background: ${primaryBlue};
        }
    }
`

export const StyledReceiptContent = styled.div`
    .header {
        color: #F9FAFB;
        padding: 15px 50px;
        background: ${primaryBlue};

        @media screen and (max-width: 520px) {
            padding: 8px 20px;
        }

        h2 {
            margin: 0;
            font-size: 33px;
            font-weight: 600;
            line-height: 40px;
            font-style: normal;
            font-family: SF Pro Text;
            letter-spacing: 0.0038em;
            
            @media screen and (max-width: 520px) {
                font-size: 24px;
                line-height: 30px;
            }
        }
    }

    .body {
        padding-top: 60px;
        overflow-y: scroll;
        height: calc(100vh - 230px);
        
        @media screen and (max-width: 520px) {
            padding-top: 30px;
        }

        &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: ${primaryBlue};
        }

        h3 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            color: ${grey900};
            line-height: 34px;
            text-align: center;
            font-style: normal;
            letter-spacing: 0.0038em;
            font-family: SF Pro Text;

            @media screen and (max-width: 520px) {
                font-size: 20px;
                line-height: 25px;
            }
        }

        .amount {
            margin: 0;
            font-size: 40px;
            font-weight: 600;
            margin-top: 16px;
            line-height: 32px;
            color: ${infoLink};
            text-align: center;
            font-style: normal;
            letter-spacing: 0.5px;
            font-family: SF Pro Text;

            @media screen and (max-width: 520px) {
                margin-top: 8px;
                font-size: 28px;
                line-height: 25px;
            }
        }

        .trsc-history {
            padding: 48px 60px 0px;

            @media screen and (max-width: 520px) {
                padding: 24px 20px 0px;
            }

            .date-time {
                display: flex;
                align-items: center;
                justify-content: space-between;

                span {
                    color: #374151;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 16px;
                    font-style: normal;
                    letter-spacing: 0.5px;
                    font-family: SF Pro Text;
                    
                    @media screen and (max-width: 520px) {
                        font-size: 14px;
                        line-height: 12px;
                    }
                }
            }

            .detail {
                gap: 44px;
                display: flex;
                padding: 36px;
                margin-top: 42px;
                border-radius: 6px;
                flex-direction: column;
                border: 1px solid #E7E7E7;

                @media screen and (max-width: 520px) {
                    gap: 20px;
                    padding: 10px;
                    margin-top: 20px;
                }

                p {
                    margin: 0;
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr;
                }

                .key {
                    color: #374151;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 16px;
                    font-style: normal;
                    font-family: SF Pro Text;
                    @media screen and (max-width: 520px) {
                        font-size: 14px;
                    }
                }

                .value {
                    font-size: 22px;
                    font-weight: 400;
                    color: ${grey800};
                    line-height: 20px;
                    font-style: normal;
                    font-family: SF Pro Text;
                    @media screen and (max-width: 520px) {
                        font-size: 16px;
                    }
                }
            }
        }
    }

    .footer {
        margin-top: 60px;
        margin-bottom: 16px;
        @media screen and (max-width: 520px) {
            margin-top: 20px;
            margin-bottom: 16px;
        }

        p {
            margin: 0;
            font-size: 16px;
            font-weight: 400;
            color: ${grey600};
            line-height: 16px;
            font-style: normal;
            text-align: center;
            font-family: SF Pro Text;
            
            @media screen and (max-width: 520px) {
                font-size: 12px;
            }
        }
    }
`