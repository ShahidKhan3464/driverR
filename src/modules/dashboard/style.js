import styled from "styled-components";
import { primaryBlue, grey500, grey900 } from "components/globaStyle";

export const ContentContainer = styled.div`
    gap: 20px;
    display: flex;
    margin-left: 272px;
    padding: 20px 24px;
    flex-direction: column;

    @media screen and (max-width: 991px) {
        margin-left: 0;
    }

    @media screen and (max-width: 425px) {
        padding: 16px;
    }

    .reports {
        gap: 20px;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1280px) {
            flex-wrap: wrap;
        }
    }

    .tables-container {
        gap: 20px;
        display: flex;

        @media screen and (max-width: 1280px) {
            flex-wrap: wrap;
        }

        .table {
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 24px 16px;
            background: #FFFFFF;
            border-radius: 12px;
            border: 1px solid #E7E7E7;

            &_header {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                justify-content: space-between;

                button {
                    padding: 0;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 500;
                    line-height: 18px;
                    font-style: normal;
                    color: ${primaryBlue};
                    font-family: Montserrat;
                    background: transparent;
                    text-decoration: underline;
                }
            }
        }
    }
`

export const StyledCards = styled.div`
    gap: 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 520px) {
        grid-template-columns: 1fr;
    }

    .card {
        width: 100%;
        display: flex;
        cursor: pointer;
        padding: 20px 16px;
        align-items: center;
        background: #FFFFFF;
        border-radius: 12px;
        border: 1px solid #E7E7E7;
        justify-content: space-between;

        &_detail {
            gap: 8px;
            display: flex;
            flex-direction: column;

            h3 {
                margin: 0;
                color: #1B2337;
                font-size: 13px;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                font-family: SF Pro Text;
                letter-spacing: -0.0008em;
            }

            p {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
                color: ${grey900};
                line-height: 32px;
                font-style: normal;
                font-family: SF Pro Text;
            }
        }

        &_icon {
            display: flex;
            align-items: center;
        }
    }
`

export const StyledGraph = styled.div`
    width: 100%;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px 32px 24px;
    border: 1px solid #E7E7E7;

    @media screen and (max-width: 425px) {
        padding: 16px;
    }

    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 29px;
        justify-content: space-between;

        @media screen and (max-width: 425px) {
            gap: 10px;
            margin-bottom: 12px;
        }

        .plan-type {
            gap: 24px;
            display: flex;
            align-items: center;

            @media screen and (max-width: 425px) {
                gap: 12px;
            }

            >div {
                gap: 8px;
                display: flex;
                align-items: center;
    
                .circle {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
    
                span {
                    color: #494F5F;
                    font-size: 10px;
                    font-weight: 500;
                    line-height: 100%;
                    font-style: normal;
                    font-family: SF Pro Text;
                }
            }
    
            >div:nth-child(1) {
                .circle {
                    background: #46DE70;
                }
            }
            >div:nth-child(2) {
                .circle {
                    background: #E95380;
                }
            }
            >div:nth-child(3) {
                .circle {
                    background: #962DFF;
                }
            }
        }
    }
`

export const StyledNotifications = styled.div`
    width: 100%;
    max-width: 360px;
    padding: 24px 14px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #E7E7E7;

    @media screen and (max-width: 1280px) {
        max-width: inherit;
    }

    .list {
        gap: 8px;
        display: flex;
        padding-top: 18px;
        flex-direction: column;

        &_item {
            padding-bottom: 8px;
            border-bottom:  0.2px solid #B5B4B4;

            &_text {
                h3 {
                    margin: 0;
                    color: #18181B;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 20px;
                    font-style: normal;
                    font-family: SF Pro Text;
                }

                p {
                    margin: 0;
                    font-size: 12px;
                    margin-top: 2px;
                    font-weight: 400;
                    color: ${grey500};
                    line-height: 20px;
                    font-style: normal;
                    font-family: SF Pro Text;
                }

                .time {
                    color: #A1A1AA;
                    font-size: 10px;
                    font-weight: 500;
                    line-height: 20px;
                    font-style: normal;
                    font-family: Plus Jakarta Sans;
                }
            }
        }
    }
`

export const StyledHeading = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${grey900};
    line-height: 26px;
    font-style: normal;
    font-family: SF Pro Text;
`