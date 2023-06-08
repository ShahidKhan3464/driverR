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

const Index = ({ setDialogOpen, setEmail }) => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [loading, setLoading] = useState(false)

    const initialValues = {
        newEmail: "",
        confirmEmail: ""
    }

    const handleSubmit = async (data) => {
        data.previousEmail = email
        try {
            setLoading(true)
            const response = await api.put('/auth/admin/update-email', data)
            if (response.data.status) {
                setLoading(false)
                setDialogOpen(false)
                setEmail(data.newEmail)
                localStorage.setItem('email', data.newEmail)
                SweetAlert('success', 'Update successful', 'Email has been updated successfully')
                return
            }
            setLoading(false)
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
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
                            <div
                                className='field-control'
                                style={{ position: 'relative' }}
                            >
                                <Field name="newEmail">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="12%"
                                                type="email"
                                                label="Email"
                                                autoComplete=""
                                                field={{ ...field }}
                                                error={formik.errors.email && formik.touched.email}
                                            />
                                            <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>

                            <div
                                className='field-control'
                                style={{ position: 'relative' }}
                            >
                                <Field name="confirmEmail">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="27%"
                                                type="email"
                                                autoComplete=""
                                                field={{ ...field }}
                                                label="Confirm email"
                                                error={formik.errors.confirmEmail && formik.touched.confirmEmail}
                                            />
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
                                    : 'Confirm'
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
    newEmail: Yup.string()
        .email('Invalid email address')
        .required('This field is required')
        .test('valid-domain', 'Invalid email address', (value) => {
            if (!value) return false
            const domain = value.split('@')[1]
            return domain && domain.includes('.')
        }),
    confirmEmail: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newEmail'), null], 'Emails must match')
});