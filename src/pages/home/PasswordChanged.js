import React from 'react';
import { StyledPara } from './style';
import LoginBox from 'components/loginBox';
import { useNavigate } from 'react-router-dom';
import { StyledHeading, PrimaryButton } from 'components/globaStyle';

const Index = () => {
    const navigate = useNavigate()

    return (
        <LoginBox>
            <div className='text'>
                <StyledHeading>Password changed</StyledHeading>
                <StyledPara color="#616161">Your password has been changed successfully</StyledPara>
            </div>
            <div className="btn-container" style={{ marginBottom: '36px' }}>
                <PrimaryButton type='button' onClick={() => navigate("/")}>Login</PrimaryButton>
            </div>
        </LoginBox>
    )
}

export default Index