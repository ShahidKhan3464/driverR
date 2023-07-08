import React, { useState } from 'react';
import * as Yup from "yup";
import ApiClient from 'api';
import { Form } from "antd";
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import TextFieldInput from 'components/fieldInput';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { StyledAntInput, FieldErrorMessage } from 'components/globaStyle';

const Index = ({ plan, getData, setIsEdit }) => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const initialValues = {
        name: plan.name,
        price: plan.price,
        numberPostsAllowed: plan.numberPostsAllowed,
        numberProfilesAllowed: plan.numberProfilesAllowed,
        numberApplicantsAllowed: plan.numberApplicantsAllowed,
        extraJobPrice: plan.addOns.find(addOn => addOn.text === 'Extra job post price')?.price,
        extraDriverPrice: plan.addOns.find(addOn => addOn.text === '10 driver profile price')?.price
    }

    const handleSubmit = async (data) => {
        data.interval = 'month'
        data.currency = 'usd'

        try {
            setLoading(true)
            const response = await api.put(`/payment/edit/${plan._id}`, data)
            if (response.data.status) {
                SweetAlert('success', 'Success', response.data.message)
                getData()
                setIsEdit(false)
                return
            }
            setLoading(false)
            SweetAlert('warning', 'Warning!', response.data.message)
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
        <div className='subscription_details'>
            <div className='subscription_details_type'>
                <h3>{plan.name.split(" ")[0]} plan</h3>
            </div>
            <div className='subscription_details_form'>
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
                                <div className='plan-details'>
                                    <div className='field-control'>
                                        <Field name="name">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <TextFieldInput
                                                        type="text"
                                                        width='16.5%'
                                                        mbWidth="30%"
                                                        autoComplete=""
                                                        label="Plan name"
                                                        field={{ ...field }}
                                                        error={formik.errors.name && formik.touched.name}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='field-control'>
                                        <Field name="price">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <TextFieldInput
                                                        width='16%'
                                                        type="text"
                                                        mbWidth="30%"
                                                        autoComplete=""
                                                        label="Plan price"
                                                        field={{ ...field }}
                                                        error={formik.errors.price && formik.touched.price}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>
                                </div>

                                <div className='features'>
                                    <h3>Features</h3>
                                    <div className='field-control'>
                                        <label>1. Post jobs allowed</label>
                                        <div>
                                            <Field name="numberPostsAllowed">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <StyledAntInput
                                                            {...field}
                                                            type="text"
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className='field-control'>
                                        <label>2. Show drivers profile without posting jobs</label>
                                        <div>
                                            <Field name="numberProfilesAllowed">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <StyledAntInput
                                                            {...field}
                                                            type="text"
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className='field-control'>
                                        <label>3. Show compatible drivers according to posted jobs</label>
                                        <Field name="disabled">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <StyledAntInput
                                                        disabled
                                                        {...field}
                                                        type="text"
                                                        placeholder='No of drivers'
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='field-control'>
                                        <label>4. A maximum number of applicants can apply for a job post</label>
                                        <div>
                                            <Field name="numberApplicantsAllowed">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <StyledAntInput
                                                            {...field}
                                                            type="text"
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <div style={{ paddingBottom: '16px' }} className='field-control'>
                                        <label>5. Video meetings for driver interviews</label>
                                        <div></div>
                                    </div>

                                    <div className='field-control'>
                                        <label>6. Internal notes for interviews</label>
                                        <div></div>
                                    </div>

                                    <div className='btn-container'>
                                        <button
                                            type='button'
                                            className='cancel-btn'
                                            onClick={() => setIsEdit(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='save-btn'
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
                                </div>

                                <div className='ad-ons'>
                                    <h3>Ad-ons</h3>
                                    <div className='field-control'>
                                        <label>1. Extra job post price</label>
                                        <div>
                                            <Field name="extraJobPrice">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <StyledAntInput
                                                            {...field}
                                                            type="text"
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className='field-control'>
                                        <label>2. Extra driver profile price</label>
                                        <div>
                                            <Field name="extraDriverPrice">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <StyledAntInput
                                                            {...field}
                                                            type="text"
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Index
const validationSchema = Yup.object({
    name: Yup.string()
        .required('This field is required')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters are allowed'),
    price: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid price', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    numberPostsAllowed: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid input', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    numberProfilesAllowed: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid input', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    numberApplicantsAllowed: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid input', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    extraJobPrice: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid price', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    extraDriverPrice: Yup.string()
        .required('This field is required')
        .test('valid-price', 'Invalid price', value => {
            const regex = /^\d+$/
            return regex.test(value)
        }),
    // .test('is-decimal', 'Decimal values are not allowed', value => {
    //     return Number(value) === parseInt(value)
    // }),
});