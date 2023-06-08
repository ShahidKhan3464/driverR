import React from 'react';
import { StyledLoginBox } from './style';

const Index = ({ children }) => {

    return (
        <StyledLoginBox>
            <div className='loginBoxContainer_content'>
                <div className='loginBoxContainer_content_title'>
                    <h1>Logo</h1>
                </div>
                <div className='loginBoxContainer_content_children'>
                    {children}
                </div>
            </div>
        </StyledLoginBox>
    )
}

export default Index