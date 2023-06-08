import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import ApiClient from 'api';
import { StyledEmailUpdate } from './style';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import { FieldErrorMessage } from 'components/globaStyle';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ setDialogOpen, setDialogType }) => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (data) => {
        data.email = email
        try {
            setLoading(true)
            const response = await api.post('/auth/admin/reset-email-verify', data)
            if (response.data.status) {
                setDialogType('email')
                setLoading(false)
                return
            }
            setLoading(false)
            SweetAlert('warning', 'Warning!', 'Invalid password')
            setDialogOpen(false)
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
            setDialogOpen(false)
        }
    }

    return (
        <StyledEmailUpdate>
            <Formik
                initialValues={{ password: "" }}
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
                            <div
                                className='field-control'
                                style={{ position: 'relative' }}
                            >
                                <Field name="password">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="34%"
                                                autoComplete=""
                                                field={{ ...field }}
                                                label="Current password"
                                                type={showPassword ? 'text' : 'password'}
                                                error={formik.errors.password && formik.touched.password}
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
                                            <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>

                            <button
                                type='submit'
                                className='update-btn'
                            >

                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color='inherit'
                                    />
                                )
                                    : 'Done'
                                }
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </StyledEmailUpdate>
    )
}

export default Index
const validationSchema = Yup.object({
    password: Yup.string().required('This field is required')
});