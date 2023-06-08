import React, { useEffect, useState } from 'react';
import ApiClient from 'api';
import { StyledPara } from './style';
import LoginBox from 'components/loginBox';
import SweetAlert from 'components/sweetAlert';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, PrimaryButton, grey900 } from 'components/globaStyle';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [loading, setLoading] = useState(false)

    const handleResendEmail = async () => {
        try {
            setLoading(true)
            const response = await api.post('/auth/admin/forget-password', { email: state })
            if (response.data.status) {
                SweetAlert('success', 'Success', 'Email resend successfully')
                setLoading(false)
                return
            }
            SweetAlert('warning', 'Warning!', response.data.message)
            setLoading(false)
        }
        catch (error) {
            setLoading(true)
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!state) {
            navigate("/")
        }
    }, [state, navigate])

    return (
        <LoginBox>
            <div className='check-inbox'>
                <div className='text'>
                    <StyledHeading>Check your inbox</StyledHeading>
                    <StyledPara color="#616161">We have sent the instructions for resetting your password to <span style={{ fontWeight: 600, color: grey900 }}>{state}</span> </StyledPara>
                    <StyledPara color="#1F2937" style={{ margin: 0 }}>Didn’t receive the email? Check spam or</StyledPara>
                </div>
                <div className="btn-container">
                    <PrimaryButton
                        type='button'
                        disabled={loading}
                        onClick={handleResendEmail}
                    >
                        {loading ? (
                            <CircularProgress
                                size={22}
                                color='inherit'
                            />
                        ) : (
                            <span>Resend email</span>
                        )}
                    </PrimaryButton>
                </div>
                <div className='back-btn'>
                    <PrimaryButton type='button' onClick={() => navigate("/")}>Back to login</PrimaryButton>
                </div>
            </div>
        </LoginBox>
    )
}

export default Index