import styled from "styled-components";
import { grey500, grey600, grey800 } from "components/globaStyle";

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

    .heading {
        padding: 24px;
        border-bottom: 1px solid #E7E7E7;

        @media screen and (max-width: 520px) {
            padding: 12px;
        }
    }

    .details {
        padding: 24px;

        @media screen and (max-width: 520px) {
            padding: 12px;
        }

        &_content {
            gap: 40px;
            display: flex;
            position: relative;
            /* align-items: center; */
            
            @media screen and (max-width: 1080px) {
                gap: 50px;
                align-items: flex-start;
                flex-direction: column-reverse;
            }

            @media screen and (max-width: 520px) {
                gap: 20px;
            }

            &_row {
                &_title {
                    margin-bottom: 24px;

                    @media screen and (max-width: 520px) {
                        margin-bottom: 12px;
                    }

                    h2 {
                        margin: 0;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 25px;
                        color: ${grey800};
                        font-style: normal;
                        padding-bottom: 8px;
                        font-family: SF Pro Text;
                        letter-spacing: -0.0045em;

                        @media screen and (max-width: 520px) {
                            font-size: 18px;
                        }
                    }

                    .jobId {
                        color: #4B5563;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 16px; 
                        font-style: normal;
                        font-family: SF Pro Text;
                    }
                }

                &_text {
                    gap: 30px;
                    display: flex;
                    flex-wrap: wrap;

                    /* @media screen and (max-width: 768px) {
                        gap: 30px;
                    } */

                    @media screen and (max-width: 520px) {
                        gap: 15px;
                    }

                    &_box {
                        gap: 20px;
                        display: flex;
                        flex-direction: column;

                        @media screen and (max-width: 520px) {
                            gap: 15px;
                        }

                        .licenseWithExp {
                            gap: 30px;
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            flex-direction: row;

                            @media screen and (max-width: 520px) {
                                gap: 15px;
                            }

                            >div {
                                gap: 4px;
                                display: flex;
                                flex-direction: column;
                            }
                        }

                        &_pair {
                            gap: 4px;
                            display: flex;
                            flex-direction: column;

                            &_equipmentType, &_routeType {
                                display: flex;
                                flex-wrap: wrap;
                                align-items: center;
                            }
        
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

                &_company {
                    gap: 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    
                    @media screen and (max-width: 1080px) {
                        gap: 30px;
                        grid-template-columns: 1fr;
                    }

                    @media screen and (max-width: 520px) {
                        gap: 20px;
                    }

                    .status {
                        @media screen and (max-width: 520px) {
                            order: 2;
                            height: 25px;
                        }

                        span {
                            height: 37px;

                            @media screen and (max-width: 520px) {
                                height: 25px;
                            }
                        }
                    }
    
                    &_data {
                        display: grid;

                        @media screen and (max-width: 520px) {
                            order: 1;
                            img {
                                width: 96px;
                                height: 96px;
                            }
                        }
    
                        span {
                            font-size: 15px;
                            font-weight: 400;
                            line-height: 29px;
                            font-style: normal;
                            font-family: SF Pro Text;

                            @media screen and (max-width: 520px) {
                                font-size: 12px;
                                line-height: 25px;
                            }
                        }
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
            line-height: 25px;
            font-style: normal;
            word-break: break-word;
            font-family: SF Pro Text;      
            
            @media screen and (max-width: 520px) {
                margin-top: 6px;
            }
        }
    }
`