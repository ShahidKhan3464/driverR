import React, { useState } from 'react';
import * as Yup from "yup";
import ApiClient from 'api';
import { Form } from "antd";
import { StyledGeneral } from './style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { FieldErrorMessage, primaryBlue } from 'components/globaStyle';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [loading, setLoading] = useState(false)

    const initialValues = {
        newPassword: "",
        currentPassword: "",
        confirmNewPassword: "",
    }

    const PasswordInput = ({ label, name, width }) => {
        const [showPassword, setShowPassword] = useState(false)

        return (
            <Field name={name}>
                {({ field, form }) => (
                    <React.Fragment>
                        <TextFieldInput
                            reset="true"
                            width={width}
                            label={label}
                            autoComplete=""
                            field={{ ...field }}
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
                                <img src='/images/eye-icon.svg' alt='eye-icon' />
                            </button>
                        )}
                        <ErrorMessage name={name} component={FieldErrorMessage} />
                    </React.Fragment>
                )}
            </Field>
        )
    }

    const handleSubmit = async (data, { resetForm }) => {
        data.email = email
        try {
            setLoading(true)
            const response = await api.put('/auth/admin/change-password', data)
            if (response.data.status) {
                SweetAlert('success', 'Success', response.data.message)
                resetForm()
                setLoading(false)
                return
            }
            SweetAlert('error', 'Warning!', 'Incorrect current password')
            setLoading(false)
        }
        catch (error) {
            setLoading(true)
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }

    return (
        <StyledGeneral>
            <h2>Change password</h2>
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
                                <PasswordInput label='Current password' name='currentPassword' width="16.5%" />
                            </div>

                            <div className='new-confirm_password'>
                                <div className='match-password'>
                                    <PasswordInput label='New password' name='newPassword' width="29.5%" />
                                </div>
                                <div className='match-password'>
                                    <PasswordInput label='Confirm password' name='confirmNewPassword' width="36%" />
                                </div>
                            </div>

                            <div className='btn-container'>
                                <button type='button' className='cancel-btn'>Cancel</button>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='save-btn'
                                    style={{
                                        width: '119px',
                                        display: 'flex',
                                        color: '#FFFFFF',
                                        alignItems: 'center',
                                        background: primaryBlue,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={22}
                                            color='inherit'
                                        />
                                    )
                                        : 'Save changes'
                                    }
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </StyledGeneral>
    )
}

export default Index
const validationSchema = Yup.object({
    currentPassword: Yup.string().required('This field is required'),
    newPassword: Yup.string()
        .required('This field is required')
        .min(8, 'Password must contain min 8 characters')
        .max(20, 'Password can have max 20 characters')
        .notOneOf([Yup.ref('currentPassword')], 'New password must be different from the current password')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, 'Password must contain at least one upper-case letter, one lower-case letter, one numeric character, and one special character'),
    confirmNewPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});