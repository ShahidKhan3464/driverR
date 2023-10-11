import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import { grey500, grey900, primaryBlue } from "components/globaStyle";

export const ContentContainer = styled.div`

    h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        line-height: 26px;
        font-style: normal;
        margin-bottom: 20px;
        color: ${primaryBlue};
        font-family: SF Pro Text;
        text-transform: capitalize;

        @media screen and (max-width: 520px) {
            font-size: 20px;
            line-height: 24px;
        }
    }

    margin-top: 20px;
    margin-right: 24px;
    margin-left: 294px;
    padding: 20px 24px;
    margin-bottom: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #E7E7E7;

    @media screen and (max-width: 991px) {
        margin-left: 24px;
    }

    @media screen and (max-width: 520px) {
        padding: 16px;
        margin-top: 16px;
        margin-left: 16px;
        margin-right: 16px;
    }

    .subscription {
        position: relative;

        &_loading {
            height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 190px);
        }

        &_plans {
            gap: 24px;
            display: flex;
            margin-top: 24px;
            
            @media screen and (max-width: 1200px) {
                flex-wrap: wrap;
            }
            
            @media screen and (max-width: 520px) {
                margin-top: 12px;
            }

            &_plan {
                width: 100%;
                background: #F8F8F8;
                border-radius: 12px;
                padding: 40px 24px 24px;
                border: 1px solid #9CA3AF;

                @media screen and (max-width: 520px) {
                    padding: 20px 12px 12px;
                }

                &_top {
                    display: flex;
                    margin-bottom: 40px;
                    align-items: flex-start;
                    justify-content: space-between;

                    @media screen and (max-width: 520px) {
                        margin-bottom: 24px;
                    }

                    &_left {

                        p {
                            gap: 8px;
                            margin: 0;
                            display: flex;
                            font-size: 32px;
                            font-weight: 400;
                            line-height: 38px;
                            font-style: normal;
                            align-items: center;
                            color: ${primaryBlue};
                            font-family: SF Pro Text;

                            @media screen and (max-width: 520px) {
                                font-size: 28px;
                                line-height: 33px;
                            }

                            span {
                                font-size: 16px;
                                font-weight: 300;
                                line-height: 19px;

                                @media screen and (max-width: 520px) {
                                    font-size: 14px;
                                    line-height: 17px;
                                }
                            }
                        }
                    }

                    &_edit {
                        button {
                            border: none;
                            outline: none;
                            cursor: pointer;
                            background: transparent;
                        }
                    }
                }
            }

            &_services, &_ad-ons {
                gap: 16px;
                display: flex;
                flex-direction: column;
                
                &_service, .service {
                    gap: 17px;
                    display: grid;
                    align-items: center;
                    grid-template-columns: 32px 1fr;

                    @media screen and (max-width: 520px) {
                        grid-template-columns: 24px 1fr;
                    }

                    .active, .in-active {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        border-radius: 50%;
                        align-items: center;
                        justify-content: center;

                        @media screen and (max-width: 520px) {
                            width: 24px;
                            height: 24px;
                        }
                    }
                    
                    .active {
                        background: ${primaryBlue};
                    }
                    
                    .in-active {
                        background: #CBCBCB;
                    }

                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: ${grey900};
                        line-height: 17px;
                        font-style: normal;
                        font-family: SF Pro Text;

                        @media screen and (max-width: 520px) {
                            font-size: 13px;
                            line-height: 16px;
                        }
                    }
                }
            }
        }

        &_details {
            margin-top: 30px;
            background: #FFFEFD;
            border-radius: 12px;
            border: 1px solid #E7E7E7;
            box-shadow: 0px 0px 12px rgba(36, 185, 236, 0.08);

            @media screen and (max-width: 520px) {
                margin-top: 15px;
            }

            &_type {
                padding: 11px 24px;
                background: ${primaryBlue};
                border-radius: 12px 12px 0px 0px;

                @media screen and (max-width: 520px) {
                    padding: 11px 12px;
                }

                h3 {
                    margin: 0;
                    color: #F9FAFB;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 19px;
                    font-style: normal;
                    font-family: SF Pro Text;

                    @media screen and (max-width: 520px) {
                        font-size: 14px;
                    }
                }
            }

            &_form {
                padding: 30px 24px 60px;

                @media screen and (max-width: 520px) {
                    padding: 20px 12px 30px;
                }

                form {
                    gap: 40px;
                    display: flex;
                    flex-direction: column;

                    @media screen and (max-width: 520px) {
                        gap: 20px;
                    }

                    .plan-details {
                        gap: 24px;
                        display: grid;
                        align-items: center;
                        grid-template-columns: 1fr 1fr;

                        @media screen and (max-width: 768px) {
                            grid-template-columns: 1fr;
                        }

                        .field-control {
                            position: relative;
                        }
                    }

                    .features, .ad-ons {
                        gap: 16px;
                        display: flex;
                        flex-direction: column;

                        h3 {
                            margin: 0;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 25px;
                            color: ${grey900};
                            font-style: normal;
                            margin-bottom: 3px;
                            font-family: SF Pro Text;   
                            letter-spacing: -0.0045em;
                        }

                        .field-control {
                            display: grid;
                            position: relative;
                            align-items: center;
                            grid-template-columns: 1fr 1fr;

                            @media screen and (max-width: 520px) {
                                gap: 10px;
                                grid-template-columns: 1fr;
                            }
    
                            .ant-input-disabled {
                                opacity: 0.38;
                                background: transparent;
                            }
    
                            label {
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 24px;
                                color: ${grey500};
                                font-style: normal;
                                font-family: SF Pro Text;
                            }
    
                            input {
                                color: ${grey500};
                            }

                            input::-webkit-outer-spin-button,
                            input::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                            }
                        }

                        .btn-container {
                            top: 0;
                            gap: 16px;
                            right: 8px;
                            display: flex;
                            position: absolute;
                            align-items: center;
    
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
                                font-family: SF Pro Text;
                                letter-spacing: -0.0008em;

                                @media screen and (max-width: 520px) {
                                    height: 35px;
                                    font-size: 11px;
                                }

                                @media screen and (max-width: 350px) {
                                    height: 30px;
                                    font-size: 9px;
                                }
                            }
    
                            .cancel-btn {
                                width: 75px;
                                color: ${primaryBlue};
                                background: transparent;
                                border: 1px solid ${primaryBlue};

                                @media screen and (max-width: 768px) {
                                    display: none;
                                }
                            }
                            
                            .save-btn {
                                width: 120px;
                                color: #F9FAFB;
                                background: ${primaryBlue};

                                @media screen and (max-width: 520px) {
                                    width: 100px;
                                }

                                @media screen and (max-width: 350px) {
                                    width: 70px;
                                }
                            }
                        }
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