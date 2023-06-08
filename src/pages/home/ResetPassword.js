import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import ApiClient from 'api';
import { StyledPara } from './style';
import LoginBox from 'components/loginBox';
import SweetAlert from 'components/sweetAlert';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, FieldErrorMessage, PrimaryButton } from 'components/globaStyle';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const query = new URLSearchParams(location.search)
    const email = query.get("email")
    const verifyCode = query.get("passwordVerificationCode")

    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    }

    const PasswordInput = ({ label, name, width, mbWidth }) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <Field name={name}>
                {({ field, form }) => (
                    <React.Fragment>
                        <TextFieldInput
                            width={width}
                            label={label}
                            mbWidth={mbWidth}
                            field={{ ...field }}
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            error={form.errors[name] && form.touched[name]}
                        />
                        {field.value && (
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    top: '16px',
                                    padding: '0',
                                    right: '16px',
                                    border: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    background: 'transparent'
                                }}
                            >
                                <img src='images/eye-icon.svg' alt='eye-icon' />
                            </button>
                        )}
                        <ErrorMessage name={name} component={FieldErrorMessage} />
                    </React.Fragment>
                )}
            </Field>
        )
    }

    const handleSubmit = async (data) => {
        data.email = email
        try {
            setLoading(true)
            const response = await api.put('/auth/admin/reset-password', data)
            if (response.data.status) {
                navigate("/password-changed")
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

    const validateData = useCallback(async (email, code) => {
        const data = { email, passwordVerificationCode: code }
        try {
            const response = await api.post('/auth/admin/verify-email-code', data)
            if (response.data.status) {
                return
            }
            navigate("/")
            SweetAlert('warning', 'Warning!', response.data.message)
        }
        catch (error) {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
    }, [])

    useEffect(() => {
        if (!email && !verifyCode) {
            navigate("/")
            return
        }
        validateData(email, verifyCode)

    }, [email, verifyCode, navigate, validateData])

    return (
        <LoginBox>
            <div className='text'>
                <StyledHeading>Reset password</StyledHeading>
                <StyledPara color="#616161">Create a new password for your account</StyledPara>
            </div>

            <div className='form-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                noValidate
                                name='basic'
                                autoComplete='off'
                                onFinish={formik.handleSubmit}
                            >
                                <div className='field-control'>
                                    <PasswordInput label='New password' name='newPassword' width="23.5%" mbWidth="34.5%" />
                                </div>

                                <div className='field-control' style={{ marginTop: '15px' }}>
                                    <PasswordInput label='Confirm password' name='confirmPassword' width="29%" mbWidth="43%" />
                                </div>

                                <div className="btn-container" style={{ marginBottom: '33px' }}>
                                    <PrimaryButton
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress
                                                size={22}
                                                color='inherit'
                                            />
                                        ) : (
                                            <span>Reset password</span>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </LoginBox>
    )
}

export default Index
const validationSchema = Yup.object({
    newPassword: Yup.string()
        .required('This field is required')
        .min(8, 'Password must contain min 8 characters')
        .max(20, 'Password can have max 20 characters')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, 'Password must contain at least one upper-case letter, one lower-case letter, one numeric character, and one special character'),
    confirmPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});