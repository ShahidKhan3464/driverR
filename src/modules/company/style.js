import styled from "styled-components";
import { grey500, grey600, grey800, infoLink } from "components/globaStyle";

export const ContentContainer = styled.div`
    margin-left: 272px;
    padding: 20px 24px;

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
            gap: 12px;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            align-items: center;
            justify-content: space-between;

            .disabled-btn {
                cursor: not-allowed;
            }

            button {
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
            }
        }

        &_control-elements {
            gap: 12px;
            display: flex;
            flex-wrap: wrap;
            margin-top: 29px;
            margin-bottom: 24px;
            justify-content: space-between;

            @media screen and (max-width: 520px) {
                margin-top: 17px;
                margin-bottom: 12px;
            }

            &_filterbox {
                gap: 24px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                @media screen and (max-width: 520px) {
                    gap: 8px;
                }
            }
        }
    }
`

export const StyledDetailsContent = styled.div`
    margin-top: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #E7E7E7;

    @media screen and (max-width: 520px) {
        margin-top: 12px;
    }

    .header {
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #E7E7E7;

        @media screen and (max-width: 520px) {
            padding: 12px;
        }

        .btn-container {
            gap: 16px;
            display: flex;
            align-items: center;

            @media screen and (max-width: 520px) {
                gap: 8px;
            }

            button {
                border: none;
                outline: none;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                padding: 11px 16px;
                border-radius: 6px;
                background: transparent;
                font-family: SF Pro Text;
                letter-spacing: -0.0008em;

                @media screen and (max-width: 520px) {
                    font-size: 11px;
                    line-height: 16px;
                    padding: 6px 10px;
                }
            }

            .reject-btn {
                color: #EF4444;
                border: 1px solid #EF4444;
            }

            .accept-btn {
                color: #F9FAFB;
                background: #22C55E;
            }
        }
    }

    .profile {
        gap: 32px;
        padding: 24px;
        display: flex;
        flex-wrap: wrap;

        @media screen and (max-width: 520px) {
            gap: 16px;
            padding: 12px 16px;
        }

        &_logo {
            width: 132px;
            height: 132px;
            border-radius: 50%;

            @media screen and (max-width: 520px) {
                width: 96px;
                height: 96px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        &_content {
            gap: 90px;
            display: flex;

            @media screen and (max-width: 520px) {
                gap: 20px;
                flex-direction: column-reverse;
            }

            &_text {
                gap: 70px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                @media screen and (max-width: 768px) {
                    gap: 40px;
                }

                @media screen and (max-width: 520px) {
                    gap: 25px;
                }

                &_box {
                    gap: 24px;
                    display: flex;
                    flex-direction: column;
                    align-self: self-start;

                    @media screen and (max-width: 520px) {
                        gap: 12px;
                    }

                    &_pair {
                        gap: 4px;
                        display: flex;
                        flex-direction: column;
    
                        h3, p {
                            margin: 0;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 29px;
                            font-style: normal;
                            font-family: SF Pro Text;

                            @media screen and (max-width: 520px) {
                                font-size: 14px;
                                line-height: 20px;
                            }
                        }
                        
                        h3 {
                            color: ${grey500};
                        }
                        
                        p {
                            color: ${grey800};
                        }
                    }
                }
            }

            &_status {
                span {
                    height: 37px;

                    @media screen and (max-width: 520px) {
                        height: 25px;
                    }
                }
            }
        }
    }

    .description {
        padding: 24px;
        border-top: 1px solid #E7E7E7;

        @media screen and (max-width: 520px) {
            padding: 12px;
        }
        
        h3 {
            margin: 0;
            font-size: 17px;
            font-weight: 600;
            color: ${grey800};
            line-height: 22px;
            font-style: normal;
            font-family: SF Pro Text;                
            letter-spacing: -0.0043em;
        }
        
        p {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            margin-top: 12px;
            color: ${grey600};
            line-height: 21px;
            font-style: normal;
            font-family: SF Pro Text;               
        }
    }
`