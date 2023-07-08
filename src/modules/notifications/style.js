import styled from "styled-components";
import { grey500, } from "components/globaStyle";

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

    .notifications {
        &_header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;

            &_right {
                gap: 20px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                @media screen and (max-width: 520px) {
                  gap: 5px;
                }

                .show-unread {
                    .customLabel {
                        flex-direction: row-reverse;

                        .MuiFormControlLabel-label {
                            color: #212121;
                            font-size: 12px;
                            font-weight: 500;
                            line-height: 18px;
                            font-style: normal;
                            font-family: SF Pro Text;

                            @media screen and (max-width: 520px) {
                                margin-left: 11px;
                            }
                        }
                    }
                }

                .mark-asread {
                    p {
                        gap: 2px;
                        margin: 0;
                        display: flex;
                        color: #757575;
                        font-size: 14px;
                        cursor: pointer;
                        font-weight: 500;
                        line-height: 21px;
                        font-style: normal;
                        align-items: center;
                        font-family: SF Pro Text;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        &_list {
            margin-top: 32px;

            @media screen and (max-width: 520px) {
                margin-top: 10px;
            }

            &_item {
                padding-top: 12px;
                padding-bottom: 8px;
                border-bottom: 0.5px solid #B5B4B4;

                .duration {
                    margin: 0;
                    color: #A1A1AA;
                    font-size: 10px;
                    font-weight: 500;
                    line-height: 20px;
                    font-style: normal;
                    font-family: Plus Jakarta Sans;       
                }

                >div {
                    gap: 15px;
                    display: grid;
                    align-items: center;
                    grid-template-columns: auto 1fr;

                    @media screen and (max-width: 520px) {
                        align-items: inherit;
                    }

                    .bell-icon {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        border-radius: 50%;
                        background: #EFEFEF;
                        align-items: center;
                        justify-content: center;
                    }

                    .text {
                        .title {
                            margin: 0;
                            color: #18181B;
                            font-size: 12px;
                            font-weight: 600;
                            line-height: 20px;
                            font-style: normal;
                            font-family: SF Pro Text;
                        }
        
                        .message {
                            margin: 0;
                            font-size: 12px;
                            font-weight: 400;
                            line-height: 20px;
                            color: ${grey500};
                            font-style: normal;
                            font-family: SF Pro Text;
                        }
                    }
                }
            }
        }
    }

`