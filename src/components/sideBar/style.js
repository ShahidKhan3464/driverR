import styled from "styled-components";
import { Layout } from 'antd';
import { primaryBlue } from "components/globaStyle";
const { Sider } = Layout;

export const SideBar = styled(Sider)(({ sidebarVisible }) => ({
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '2',
    overflow: 'scroll',
    width: '272px !important',
    position: 'fixed !important',
    maxWidth: 'inherit !important',
    background: `${primaryBlue} !important`,
    transition: 'left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important',
    '&::-webkit-scrollbar': {
        width: '0px',
        height: '0px',
    },
    '@media screen and (max-width: 991px)': {
        width: '256px !important',
        left: sidebarVisible ? 0 : '-272px',
    }
}))

export const SideBarContainer = styled.div`
    padding: 19px 18px;

    .sidebarContainer {
        &_title {
            @media screen and (max-width: 991px) {
                display: none;
            }
            h2 {
                margin: 0;
                color: #F9FAFB;
                font-weight: 600;
                line-height: 40px;
                font-style: normal;
                font-size: 33.408px;
                letter-spacing: 0.0038em;
                font-family: SF Pro Text;
            }
        }

        &_menu {
            margin-top: 80px;
            @media screen and (max-width: 991px) {
                margin-top: 20px;
            }

            ul {
                margin: 0;
                padding: 0;
                list-style-type: none;

                li {
                    margin-bottom: 28px;

                    .active {
                        border-radius: 6px;
                        background: #FFFFFF;
                        color: ${primaryBlue};

                        svg path {
                            fill: ${primaryBlue};
                        }

                        .menu-text {
                            font-size: 17px;
                            font-weight: 400;
                            line-height: 22px;
                            font-style: normal;
                            font-family: SF Pro Text;
                            letter-spacing: -0.0043em;
                        }
                    }

                    a {
                        gap: 20px;
                        display: flex;
                        color: #F9FAFB;
                        padding: 8px 13px;
                        @media screen and (max-width: 991px) {
                            gap: 16px;
                            padding: 8px;
                        }

                        &:hover {
                            border-radius: 6px;
                            background: #FFFFFF;
                            color: ${primaryBlue};

                            svg path {
                                fill: ${primaryBlue};
                            }

                            .menu-text {
                                font-size: 17px;
                                font-weight: 400;
                                line-height: 22px;
                                font-style: normal;
                                font-family: SF Pro Text;
                                letter-spacing: -0.0043em;
                            }
                        }

                        .menu-text {
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 24px;
                            font-style: normal;
                            font-family: Poppins;
                        }
                    }
                }

                .accordion {
                    padding: 0 13px;
                    @media screen and (max-width: 991px) {
                        padding: 0 8px;
                    }

                    .MuiPaper-root {
                        box-shadow: none;
                        background: transparent;

                        .MuiButtonBase-root {
                            gap: 30px;
                            padding: 0;
                            min-height: 0px;
                            display: inline-flex;

                            .MuiAccordionSummary-content {
                                gap: 20px;
                                margin: 0;

                                .menu-text {
                                    color: #F9FAFB;
                                    font-size: 16px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    font-style: normal;
                                    font-family: Poppins;
                                }
                            }

                            .MuiAccordionSummary-expandIconWrapper {
                                color: #F9FAFB;
                            }
                        }

                        .MuiAccordionDetails-root {
                            gap: 10px;
                            display: flex;
                            padding: 12px 0 0;
                            flex-direction: column;

                            a {
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 22px;
                                font-style: normal;
                                font-family: Poppins;
                            }
                        }
                    }
                }

                .logout {
                    gap: 20px;
                    display: flex;
                    padding: 8px 13px;
                    align-items: center;
                    @media screen and (max-width: 991px) {
                        padding: 8px;
                    }

                    &:hover {
                        border-radius: 6px;
                        background: #FFFFFF;
                        color: ${primaryBlue};

                        svg path {
                            fill: ${primaryBlue};
                        }

                        .menu-text {
                            color: ${primaryBlue};
                        }
                    }

                    .menu-text {
                        color: #F9FAFB;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        font-style: normal;
                        font-family: Poppins;
                    }
                }
            }
        }
    }
`