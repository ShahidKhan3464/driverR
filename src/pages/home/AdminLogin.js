import React, { useState } from 'react';
import * as Yup from "yup";
import ApiClient from 'api';
import { Form } from "antd";
import { StyledPara } from './style';
import { Link } from 'react-router-dom';
import LoginBox from 'components/loginBox';
import SweetAlert from 'components/sweetAlert';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, FieldErrorMessage, PrimaryButton } from 'components/globaStyle';

const Index = () => {
    const api = new ApiClient()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const initialValues = {
        email: "",
        password: ""
    }

    const suffix = (name, formik) => {
        return (
            <button
                type='button'
                onClick={() => formik.setFieldValue(name, "")}
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
                <img src='images/cross-icon.svg' alt='cross-icon' />
            </button>
        )
    }

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await api.post('auth/admin/login', data)
            if (response.data.status) {
                const authToken = response.data.result.data.accessToken
                const email = response.data.result.data.admin.email
                if (authToken) {
                    localStorage.setItem('email', email)
                    localStorage.setItem('authToken', authToken)
                    window.location.href = '/admin/dashboard'
                }
            }
            else {
                SweetAlert('warning', 'Warning!', 'Invalid credentials')
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(true)
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }

    return (
        <LoginBox>
            <div className='text'>
                <StyledHeading>Admin login</StyledHeading>
                <StyledPara color="#6B7280">Welcome back. Enter your credentials to access your account</StyledPara>
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
                                    <Field name="email">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    width="10%"
                                                    type="email"
                                                    mbWidth="15%"
                                                    label="Email"
                                                    field={{ ...field }}
                                                    autoComplete="current-password"
                                                    error={formik.errors.email && formik.touched.email}
                                                />
                                                {field.value && suffix(field.name, formik)}
                                                <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                            </React.Fragment>
                                        )}
                                    </Field>
                                </div>

                                <div className='field-control'>
                                    <Field name="password">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    width="16%"
                                                    mbWidth="24%"
                                                    label="Password"
                                                    field={{ ...field }}
                                                    autoComplete="current-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    error={formik.errors.password && formik.touched.password}
                                                />
                                                {field.value && !formik.errors.password && (
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
                                                {formik.errors.password && formik.touched.password && (
                                                    <img src='images/warning.svg' alt='warning' className='warn-icon' />
                                                )}
                                                <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                            </React.Fragment>
                                        )}
                                    </Field>
                                </div>

                                <div className="btn-container">
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
                                            <span>Login</span>
                                        )}
                                    </PrimaryButton>
                                </div>

                                <div className='forgot-password'>
                                    <span>Forgot password?</span>
                                    <Link to="forgot-password">Click here</Link>
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
    email: Yup.string()
        .email('Invalid email address')
        .required('This field is required')
        .test('valid-domain', 'Invalid email address', (value) => {
            if (!value) return false
            const domain = value.split('@')[1]
            return domain && domain.includes('.')
        }),
    password: Yup.string()
        .required('This field is required')
});