import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import { StyledDialogContent, StyledFormControl } from './style';
import { StyledHeading, FieldErrorMessage } from 'components/globaStyle';

const Index = ({ open, setOpen, handleApplication }) => {
    const isMobile = useMediaQuery({ maxWidth: 520 })

    const initialValues = {
        title: "",
        description: ""
    }

    const handleSubmit = async (data) => {
        handleApplication(data)
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    width: '100%',
                    padding: '36px',
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
                        Add cause of rejection
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
                                        <Field name="title">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <StyledFormControl
                                                        fullWidth
                                                        width="7.5%"
                                                        error={formik.errors.title && formik.touched.title}
                                                    >
                                                        <InputLabel>Cause</InputLabel>
                                                        <Field
                                                            as={Select}
                                                            name='title'
                                                            label="Cause"
                                                        >
                                                            <MenuItem value="incomplete document">Incomplete Document</MenuItem>
                                                            <MenuItem value="incomplete profile">Incomplete Profile</MenuItem>
                                                            <MenuItem value="driving license issue">Driving license issue</MenuItem>
                                                            <MenuItem value="other">Other</MenuItem>
                                                        </Field>
                                                    </StyledFormControl>
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='field-control'>
                                        <Field name="description">
                                            {({ field }) => (
                                                <div className='textarea'>
                                                    <TextFieldInput
                                                        type="text"
                                                        width="13%"
                                                        autoComplete=""
                                                        label="Description"
                                                        field={{ ...field }}
                                                        error={formik.errors.description && formik.touched.description}
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
                                            className='send-btn'
                                        >
                                            Send
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
    title: Yup.string().required('This field is required'),
    description: Yup.string()
        .required('This field is required')
        .max(1000, 'Description can have max 1000 characters'),
});