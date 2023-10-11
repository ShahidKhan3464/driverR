import styled from "styled-components";
import { infoLink } from "components/globaStyle";
import { primaryBlue } from "components/globaStyle";

export const ContentContainer = styled.div`
    margin-top: 20px;
    margin-right: 24px;
    margin-left: 294px;
    margin-bottom: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 24px 60px;
    border: 1px solid #E7E7E7;

    @media screen and (max-width: 991px) {
        margin-left: 24px;
    }

    @media screen and (max-width: 520px) {
        padding: 16px;
        margin-top: 16px;
        margin-left: 16px;
        margin-right: 16px;
        padding-bottom: 80px;
    }

    .settings {
        position: relative;

        .btn-container {
            top: 0;
            right: 0;
            gap: 16px;
            display: flex;
            position: absolute;
            align-items: center;

            @media screen and (max-width: 520px) {
                left: 0;
                top: auto;
                bottom: -60px;
            }

            button {
                padding: 0;
                height: 40px;
                border: none;
                outline: none;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                border-radius: 6px;
                background: transparent;
                font-family: SF Pro Text;
                letter-spacing: -0.0008em;

                @media screen and (max-width: 520px) {
                    width: 100% !important;
                }
            }

            .cancel-btn {
                width: 75px;
                color: ${primaryBlue};
                border: 1px solid ${primaryBlue};
            }
        }

        &_content {
            gap: 20px;
            display: flex;
            margin-top: 23px;

            @media screen and (max-width: 991px) {
                flex-wrap: wrap;
            }

            @media screen and (max-width: 520px) {
                margin-top: 12px;
            }

            &_tabs {
                gap: 10px;
                width: 100%;
                display: flex;
                max-width: 265px;
                flex-direction: column;

                @media screen and (max-width: 991px) {
                    max-width: 100%;
                }

                .activeTab {
                    border-radius: 8px;
                    background: #E4F0FD;
                    border-left: 2px solid ${infoLink};

                    svg path {
                        fill: ${infoLink};
                    }

                    span {
                        color: ${infoLink};
                    }
                }

                button {
                    gap: 12px;
                    border: none;
                    height: 49px;
                    display: flex;
                    outline: none;
                    cursor: pointer;
                    padding: 0 24px;
                    border-radius: 8px;
                    align-items: center;
                    background: #F9F9F9;

                    span {
                        color: #374151;
                        font-size: 14px;
                        font-weight: 400;
                        font-style: normal;
                        line-height: 121.4%;
                        font-family: SF Pro Text;
                    }
                }
            }

            &_tabsPanel {
                width: 100%;
            }
        }
    }
`

export const StyledGeneral = styled.div`
    h2 {
        margin: 0;
        color: #111827;
        font-size: 22px;
        font-weight: 600;
        line-height: 28px;
        font-style: normal;
        margin-bottom: 16px;
        font-family: SF Pro Text;                    
        letter-spacing: -0.0026em;
    }

    form {
        gap: 24px;
        display: flex;
        flex-direction: column;

        .field-control {
            position: relative;
        }

        .disabled-field {
            gap: 16px;
            display: grid;
            grid-template-columns: 1fr 100px;

            @media screen and (max-width: 520px) {
                gap: 0;
            }

            .update-email-btn {
                padding: 0;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                color: ${primaryBlue};
                background: transparent;
                font-family: SF Pro Text;        
                letter-spacing: -0.0008em;
            }
        }

        .new-confirm_password {
            gap: 19px;
            display: flex;

            @media screen and (max-width: 991px) {
                flex-wrap: wrap;
            }

            .match-password {
                width: 100%;
                position: relative;
            }
        }

        .upload__image-wrapper {
            gap: 25px;
            display: flex;
            padding-left: 10px;
            align-items: center;
            justify-content: flex-end;
            flex-direction: row-reverse;

            @media screen and (max-width: 520px) {
                gap: 16px;
                flex-direction: column-reverse;
            }

            button {
                border: none;
                outline: none;
                color: #F9FAFB;
                font-size: 13px;
                cursor: pointer;
                font-weight: 400;
                line-height: 18px;
                padding: 11px 16px;
                font-style: normal;
                border-radius: 6px;
                font-family: SF Pro Text;       
                letter-spacing: -0.0008em;
                background: ${primaryBlue};
            }

            .upload-image {
                width: 140px;
                display: flex;
                height: 140px;
                border-radius: 50%;
                align-items: center;
                background: #C1C7D0;
                justify-content: center;
                
                @media screen and (max-width: 520px) {
                   width: 120px;
                   height: 120px;
                }

                span {
                    color: #FFFFFF;
                    font-size: 26px;
                    font-weight: 600;
                    line-height: 24px;
                    font-style: normal;
                    font-family: SF Pro Text;
                }
            }

            .image-item {
                gap: 25px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                @media screen and (max-width: 520px) {
                    justify-content: center;
                }

                .image-shown {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;

                    @media screen and (max-width: 520px) {
                        width: 120px;
                        height: 120px;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }

                .image-item__btn-wrapper {
                    gap: 16px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    @media screen and (max-width: 520px) {
                        justify-content: center;
                    }

                    button:last-child {
                        color: ${primaryBlue};
                        background: transparent;
                        border: 1px solid ${primaryBlue};
                    }
                }
            }
        }
    }
    
`

export const StyledEmailUpdate = styled.div`
    width: 100%;
    padding-bottom: 10px;

    form {
        gap: 24px;
        display: flex;
        flex-direction: column;

        .update-btn {
            padding: 0;
            height: 42px;
            border: none;
            outline: none;
            color: #FFFFFF;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            line-height: 132%;
            border-radius: 8px;
            font-style: normal;
            font-family: SF Pro Text;
            background: ${primaryBlue};
        }
    }
`