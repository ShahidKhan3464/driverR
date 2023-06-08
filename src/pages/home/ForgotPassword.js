import React, { useState } from 'react';
import * as Yup from "yup";
import ApiClient from 'api';
import { Form } from "antd";
import { StyledPara } from './style';
import LoginBox from 'components/loginBox';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, FieldErrorMessage, PrimaryButton } from 'components/globaStyle';

const Index = () => {
  const api = new ApiClient()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const suffix = (name, formik) => {
    return (
      <button
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
      const response = await api.post('/auth/admin/forget-password', data)
      if (response.data.status) {
        navigate("/check-inbox", { state: data.email })
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

  return (
    <LoginBox>
      <div className='text'>
        <StyledHeading>Forgot password</StyledHeading>
        <StyledPara color="#616161">Enter the email of your account and we will send the email to reset your password.</StyledPara>
      </div>
      <div className='form-container'>
        <Formik
          initialValues={{ email: "" }}
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
                          autoComplete=""
                          field={{ ...field }}
                          error={formik.errors.email && formik.touched.email}
                        />
                        {field.value && suffix(field.name, formik)}
                        <ErrorMessage name="email" component={FieldErrorMessage} />
                      </React.Fragment>
                    )}
                  </Field>
                </div>

                <div className="btn-container">
                  <PrimaryButton type='submit' disabled={loading}>
                    {loading ? (
                      <CircularProgress
                        size={22}
                        color='inherit'
                      />
                    ) : (
                      <span>Send reset password link</span>
                    )}
                  </PrimaryButton>
                </div>

                <div className='back-btn'>
                  <PrimaryButton type='button' onClick={() => navigate("/")}>Back to login</PrimaryButton>
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
    })
});