import styled from "styled-components";
import { grey300, grey500, grey600, infoLink, primaryBlue } from "components/globaStyle";

export const ContentContainer = styled.div`
    margin-top: 20px;
    margin-right: 24px;
    margin-left: 294px;
    margin-bottom: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 24px 10px;
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

    .help {
        gap: 20px;
        display: grid;
        grid-template-columns: 265px 1fr;

        @media screen and (max-width: 850px) {
            grid-template-columns: 1fr;
        }    

        &_left-side {
            gap: 20px;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 520px) {
                gap: 16px;
            }   

            &_tabs {
                gap: 10px;
                display: flex;
                flex-direction: column;

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
        }

        &_content {
            gap: 20px;
            display: flex;
            overflow-x: auto;
            align-items: flex-start;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            @media screen and (max-width: 520px) {
                flex-wrap: wrap;
            }  

            &_tabsPanel {
                width: 100%;

                .indicator-border {
                    background:  ${infoLink};
                }

                .MuiTabs-root {
                    min-height: 40px;

                    @media screen and (max-width: 520px) {
                        min-height: 35px;
                    }   

                    .MuiTabs-flexContainer {
                        gap: 47px;
    
                        .Mui-selected {
                            font-weight: 400;
                            color: ${infoLink};
                        }
                        
                        button {
                            padding: 0;
                            font-size: 16px;
                            font-weight: 500;
                            min-height: 30px;
                            line-height: 19px;
                            color: ${grey600};
                            font-style: normal;
                            font-family: SF Pro Text;
                            text-transform: capitalize;

                            @media screen and (max-width: 520px) {
                                font-size: 14px;
                            }   
                        }
                    }
                }
            }

            .add-btn {
                button {
                    border: none;
                    outline: none;
                    color: #F9FAFB;
                    font-size: 13px;
                    cursor: pointer;
                    font-weight: 500;
                    line-height: 18px;
                    font-style: normal;
                    border-radius: 6px;
                    padding: 11px 16px;
                    font-family: SF Pro Text;
                    letter-spacing: -0.0008em;
                    background: ${primaryBlue};
                }
            }
        }
    }
`

export const StyledAccordion = styled.div`
    gap: 14px;
    display: flex;
    flex-direction: column;

    .loader {
        height: 45vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .active {
        button:first-child {
            transform: rotate(0deg) !important;
        }

        .accordion_answer {
            max-height: 200px;
            padding-top: ${props => props.activeItem && '18px'};

            @media screen and (max-width: 520px) {
                padding-top: ${props => props.activeItem && '12px'};
            } 
        }
    }

    .accordion {
        border-radius: 6px;
        padding: 18px 24px;
        background: #F9F9F9;

        @media screen and (max-width: 520px) {
            padding: 18px 16px;
        }   
        
        &_question {
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 520px) {
                align-items: flex-start;
            } 
    
            h3 {
                margin: 0;
                font-size: 17px;
                font-weight: 600;
                line-height: 22px;
                font-style: normal;
                font-family: SF Pro Text;
                letter-spacing: -0.0043em;

                @media screen and (max-width: 520px) {
                    font-size: 14px;
                } 
            }
    
            .btns {
                gap: 16px;
                display: flex;
                align-items: center;
    
                button {
                    padding: 0;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    background: transparent;
    
                    :first-child {
                        transition: all .2s ease;
                        transform: rotate(-90deg);
                    }
                }
            }
        }
    
        &_answer {
            max-height: 0;
            overflow: hidden;
            transition: all .2s ease;
            transition-property: max-height, padding-top;
    
            p {
                margin: 0;
                font-size: 18px;
                font-weight: 400;
                line-height: 140%;
                color: ${grey500};
                font-style: normal;
                font-family: Inter;
                word-break: break-all;

                @media screen and (max-width: 520px) {
                    font-size: 14px;
                } 
            }
        }
    }
`

export const StyledSupportQuery = styled.div`
    .stack {
        gap: 12px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .MuiChip-root {
            height: 40px;
            padding: 0 16px;
            font-size: 13px;
            font-weight: 500;
            line-height: 18px;
            font-style: normal;
            border-radius: 20px;
            font-family: SF Pro Text;
            border: 1px solid #D1D5DB;
            letter-spacing: -0.0008em;
            flex-direction: row-reverse;

            span {
                padding: 0;
            }

            .number {
                margin: 0;
                width: 19px;
                height: 19px;
                display: flex;
                color: #F9FAFB;
                font-size: 10px;
                font-weight: 500;
                margin-left: 6px;
                line-height: 18px;
                border-radius: 50%;
                font-style: normal;
                align-items: center;
                justify-content: center;
                font-family: SF Pro Text;
                letter-spacing: -0.0008em;
                background: ${primaryBlue};
            }
        }
    }

    .queries {
        margin-top: 16px;

        .email {
            display: block;
            color: #C0C0C0;
            font-size: 12px;
            font-weight: 400;
            padding-top: 4px;
            line-height: 85.5%;
            font-style: normal;
            font-family: SF Pro Text;
        }

        .view-btn {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }
    }
`

export const StyledReplyQuery = styled.div`
    display: flex;
    padding: 20px;
    border-radius: 5px;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 265px);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);

    @media screen and (max-width: 520px) {
        padding: 10px;
    }   

    .reply-query {
        &_content {
            &_top {
                display: flex;
                padding-top: 4px;
                align-items: flex-start;
                justify-content: space-between;

                @media screen and (max-width: 520px) {
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }   
    
                &_left {
                    gap: 10px;
                    display: flex;
                    align-items: center;

                    button {
                        padding: 0;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        background: transparent;
                    }

                    &_subject {
                        gap: 6px;
                        display: flex;
                        align-items: center;
        
                        .avatar {
                            width: 36px;
                            height: 36px;
            
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 50%;
                            }
                        }
            
                        div:last-child {
                            gap: 11px;
                            display: flex;
                            flex-direction: column;
    
                            @media screen and (max-width: 520px) {
                                gap: 5px;
                            }  
            
                            h3 {
                                margin: 0;
                                color: #363636;
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 85.5%;
                                font-style: normal;
                                font-family: SF Pro Text;
                                text-transform: lowercase;
                            }
            
                            span {
                                color: #AAAAAA;
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 85.5%;
                                font-style: normal;
                                font-family: SF Pro Text;
    
                                @media screen and (max-width: 520px) {
                                    font-size: 10px;
                                }  
                            }
                        }
                    }
                }

                &_status {
                    .pending, .closed {
                        width: 65px;
                        height: 25px;
                        display: flex;
                        border-radius: 6px;
                        align-items: center;
                        justify-content: center
                    }

                    span {
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 17px;
                        font-style: normal;
                        font-family: SF Pro Text;
                        letter-spacing: -0.0045em;
                    }

                    .pending {
                        color: ${infoLink};
                        background: #E8ECFF;
                    }

                    .closed {
                        color: ${grey600};
                        background: #D1D5DB;
                    }
                }
            }

            &_request {
                padding-top: 30px;

                .original-request {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr auto 1fr;
    
                    div:first-child, div:last-child {
                        height: 1px;
                        background: #DBDBDB;
                    }
    
                    .text {
                        font-size: 12px;
                        font-weight: 400;
                        padding: 7px 9px;
                        color: ${grey600};
                        font-style: normal;
                        line-height: 78.8%;
                        background: #F4F3F3;
                        border-radius: 19px;
                        font-family: SF Pro Text;
                    }
                }
    
                .description {
                    padding-top: 7px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #DBDBDB;
    
                    p {
                        margin: 0;
                        color: #AAAAAA;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 130%;
                        font-style: normal;
                        font-family: SF Pro Text;

                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                        }   
                    }
                }
            }
        }
        
        &_form {
            .field-wrapper {
                padding: 8px;
                display: grid;
                position: relative;
                border-radius: 10px;
                border: 1px solid #E5EAF4;
                grid-template-columns: 1fr auto;
                box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

                .field-control {
                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        color: #666666;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 19px;
                        font-style: normal;
                        background: transparent;
                        font-family: SF Pro Text;

                        &::placeholder {
                            color: #666666;
                        }

                        @media screen and (max-width: 520px) {
                            font-size: 14px;
                        }  
                    }
                }

                .btn-container {
                    gap: 20px;
                    display: flex;

                    @media screen and (max-width: 520px) {
                        gap: 10px;
                    }   
                
                    >div {
                        width: 2px;
                        height: 100%;
                        background: #8B8B8B;
                    }

                    button {
                        border: none;
                        outline: none;
                        color: #FFFFFF;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                        font-style: normal;
                        padding: 14px 45px;
                        border-radius: 10px;
                        line-height: 71.81%;
                        font-family: SF Pro Text;
                        background: ${primaryBlue};

                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                            padding: 10px 16px;
                            border-radius: 5px;
                        }   
                    }
                }
            }
        }
    }
`

export const StyledChats = styled.div`
    padding: 30px 0 50px;

    @media screen and (max-width: 520px) {
        padding: 20px 0 30px;
    }  

    .messages {
        gap: 25px;
        display: flex;
        overflow: auto;
        padding-right: 10px;
        flex-direction: column;
        height: calc(100vh - 400px);

        @media screen and (max-width: 520px) {
            gap: 15px;
        }  

        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgb(235 230 230);
        }

        .right {
            justify-content: flex-end;

            .messageBox {
                background: rgb(239 239 239);
                border-radius: 10px 0 10px 10px;
            }
        }
        
        .left {
            justify-content: flex-end;
            flex-direction: row-reverse;

            .messageBox {
                background: rgb(211 235 249);
                border-radius: 0 10px 10px 10px;
            }
        }

        .messageContainer {
            gap: 20px;
            display: flex;
            align-items: flex-start;

            @media screen and (max-width: 520px) {
                gap: 10px;
            }   

            .messageBox {
                width: 100%;
                padding: 12px;
                max-width: 454px;
                
                @media screen and (max-width: 520px) {
                    padding: 6px;
                }  

                .messageText {
                    margin: 0;
                    color: #5A7184;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 21px;
                    font-style: normal;
                    font-family: SF Pro Text;

                    @media screen and (max-width: 520px) {
                        font-size: 12px;
                        line-height: 15px;
                    }  
                }
            }

            .user {
                gap: 10px;
                display: flex;
                flex-direction: column;

                @media screen and (max-width: 520px) {
                    gap: 5px;   
                }

                .avatar {
                    width: 43px;
                    height: 43px;

                    @media screen and (max-width: 520px) {
                        width: 30px;
                        height: 30px;    
                    } 

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }

                .date {
                    gap: 5px;
                    display: flex;
                    flex-direction: column;

                    span {
                        color: #BDBDBD;
                        font-size: 12px;
                        font-weight: 400;
                        font-style: normal;
                        text-align: center;
                        line-height: 85.5%;
                        font-family: SF Pro Text;

                        @media screen and (max-width: 520px) {
                            font-size: 10px;    
                        } 
                    }
                }
            }
        }
    }
`

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

                            textarea:first-child {
                                height: 100% !important;
                                overflow: auto !important;

                                &::-webkit-scrollbar {
                                    width: 3px;
                                    height: 3px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 10px;
                                    background: rgb(235 230 230);
                                }
                            }
                        }
                    }
                }

                .btn-container {
                    gap: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    button {
                        width: 76px;
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
                            width: 100%;
                        }
                    }

                    .cancel-btn {
                        color: ${primaryBlue};
                        border: 1px solid ${primaryBlue};
                    }

                    .save-btn {
                        color: #F9FAFB;
                        background: ${primaryBlue};
                    }

                    .disabled-btn {
                        cursor: not-allowed;
                        background: ${grey300};
                    }
                }
            }
        }
    }
`

export const StyledDropdownStatus = styled.div`
    .ant-select {
        .ant-select-selector {
            border: none;
            height: 25px;
            display: flex;
            outline: none;
            padding: 0 8px;
            align-items: center;
            box-shadow: none !important;
            background: rgba(189, 232, 205, 0.4);

            .ant-select-selection-item {
                color: #22C55E;
                font-size: 14px;
                font-weight: 400;
                line-height: 17px;
                font-style: normal;
                font-family: SF Pro Text;
                padding-inline-end: 25px;
                letter-spacing: -0.0045em;
            }
        }
    }
`