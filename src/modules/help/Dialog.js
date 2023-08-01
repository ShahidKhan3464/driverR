import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import ApiClient from 'api';
import Dialog from '@mui/material/Dialog';
import { StyledDialogContent } from './style';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, FieldErrorMessage } from 'components/globaStyle';

const Index = ({ id = null, faqs, value, open, getData, dialogType, setOpen }) => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const filterFaqs = faqs?.find(faq => faq._id === id)
    const [isFormDirty, setIsFormDirty] = useState(false)

    const initialValues = {
        question: filterFaqs?.question ? filterFaqs.question : "",
        answer: filterFaqs?.answer ? filterFaqs.answer : "",
    }

    const handleSubmit = async (data) => {
        const targetedUser = value === 0 ? 'DRIVER' : value === 1 && 'COMPANY'
        data.targetedUser = targetedUser

        if (id) {
            data.isActive = true
            try {
                setLoading(true)
                const response = await api.put(`/faqs/edit/${id}`, data)
                if (response.data.status) {
                    SweetAlert('success', 'Success', response.data.message)
                    getData(targetedUser)
                    setOpen(false)
                }
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
                setOpen(false)
                setLoading(false)
                SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            }
        }

        else {
            try {
                setLoading(true)
                const response = await api.post('/faqs/add', data)
                if (response.data.status) {
                    SweetAlert('success', 'Success', response.data.message)
                    getData(targetedUser)
                }
                else {
                    SweetAlert('warning', 'Warning!', response.data.message)
                }
                setOpen(false)
                setLoading(false)
            }
            catch (error) {
                setOpen(false)
                setLoading(true)
                const tokenExpired = error.response?.data.message
                if (tokenExpired === 'Token expired, access denied') {
                    localStorage.clear()
                    navigate("/")
                    return
                }
                setLoading(false)
                SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    width: '100%',
                    padding: '36px',
                    maxWidth: '628px',
                    overflowY: 'hidden',
                    borderRadius: '6px',
                    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',

                    ...(isMobile && {
                        padding: '15px',
                    }),
                },
            }}
        >
            <StyledDialogContent>
                <div className='content_header'>
                    <StyledHeading>
                        {dialogType === 'add' ? 'Add new FAQ' : dialogType === 'edit' && 'Edit FAQ'}
                    </StyledHeading>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            top: 36,
                            right: 36,
                            padding: 0,
                            position: 'absolute',

                            ...(isMobile && {
                                top: 12,
                                right: 12,
                            }),
                        }}
                    >
                        <img src='/images/pop-cross-icon.svg' alt='cross-icon' />
                    </IconButton>
                </div>
                <div className='content_form'>
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
                                        <Field name="question">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <TextFieldInput
                                                        type="text"
                                                        width="10.5%"
                                                        mbWidth="27%"
                                                        shrink={true}
                                                        autoComplete=""
                                                        label="Question"
                                                        field={{ ...field }}
                                                        onKeyUp={() => setIsFormDirty(true)}
                                                        placeholder="Enter your question here?"
                                                        error={formik.errors.question && formik.touched.question}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='field-control'>
                                        <Field name="answer">
                                            {({ field }) => (
                                                <div className='textarea'>
                                                    <TextFieldInput
                                                        type="text"
                                                        width="13%"
                                                        mbWidth="34%"
                                                        shrink={true}
                                                        autoComplete=""
                                                        multiline={true}
                                                        label="Description"
                                                        field={{ ...field }}
                                                        onKeyUp={() => setIsFormDirty(true)}
                                                        placeholder='Enter your description here'
                                                        error={formik.errors.answer && formik.touched.answer}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </div>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='btn-container'>
                                        <button
                                            type='button'
                                            className='cancel-btn'
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            disabled={dialogType === 'edit' && !formik.dirty && !isFormDirty}
                                            className={`save-btn ${dialogType === 'edit' && !formik.dirty && !isFormDirty ? 'disabled-btn' : ''}`}
                                        >
                                            {loading ? (
                                                <CircularProgress
                                                    size={22}
                                                    color='inherit'
                                                />
                                            ) : (
                                                // <span>
                                                dialogType === 'add' ? 'Publish' : dialogType === 'edit' && 'Save'
                                                // </span>
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </StyledDialogContent>
        </Dialog>
    )
}

export default Index
const validationSchema = Yup.object({
    question: Yup.string()
        .required('This field is required')
        .max(500, 'Question can have max 500 characters'),
    answer: Yup.string()
        .required('This field is required')
        .max(5000, 'Description can have max 5000 characters'),
});