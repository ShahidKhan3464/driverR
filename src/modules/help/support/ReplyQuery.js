import React, { useState } from 'react';
import * as Yup from "yup";
import moment from 'moment';
import { Form } from "antd";
import ApiClient from 'api';
import { Select } from 'antd';
import Messages from './Messages';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import { Formik, Field, ErrorMessage } from "formik";
import { FieldErrorMessage } from 'components/globaStyle';
import { StyledReplyQuery, StyledChats, StyledDropdownStatus } from '../style';

const Index = ({ queriesData, setReply }) => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [status, setStatus] = useState(queriesData.status)
    const [messages, setMessages] = useState(queriesData.queries)
    const createdQueryDate = moment(queriesData.createdAt).format('DD MMM YYYY')
    const lastReply =
        queriesData.queries.length === 0
            ? moment(queriesData.createdAt).fromNow()
            : moment(queriesData.queries[queriesData.queries.length - 1]?.createdAt).fromNow()
    const name =
        queriesData?.driverId ? `${queriesData.driverId.firstName} ${queriesData.driverId.lastName}`
            : queriesData?.companyId && queriesData.companyId.name
    const profilePicture =
        queriesData?.driverId ? queriesData.driverId.profilePicture
            : queriesData?.companyId && queriesData.companyId.profilePicture
    const id =
        queriesData?.driverId ? queriesData.driverId._id
            : queriesData?.companyId && queriesData.companyId._id

    const closed_pending_Status = (status) => {
        return (
            <div
                className={status === 'PENDING' ? 'pending' : status === 'CLOSED' && 'closed'}
            >
                <span>
                    {status === 'PENDING' ? 'Pending' : status === 'CLOSED' && 'Closed'}
                </span>
            </div>
        )
    }

    const in_Progress_Status = (status) => {
        return (
            <StyledDropdownStatus>
                <Select
                    defaultValue={status}
                    onChange={handleChange}
                    suffixIcon={
                        <img
                            alt='down-arrow'
                            style={{ height: '8px' }}
                            src='/images/down-arrow.svg'
                        />
                    }
                >
                    <Select.Option value="closed">
                        Closed
                    </Select.Option>
                </Select>
            </StyledDropdownStatus>
        )
    }

    const handleChange = async (value) => {
        const data = { queryId: queriesData._id }
        try {
            const response = await api.put('/support-queries/update-status', data)
            if (response.data.status) {
                setStatus('CLOSED')
                return
            }
            SweetAlert('warning', 'Warning!', response.data.message)
        }
        catch (error) {
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
    }

    const handleSubmit = async (data, { resetForm }) => {
        data.queryId = queriesData._id
        data.adminReply = true
        resetForm()
        try {
            const response = await api.post('/support-queries/send', data)
            if (response.data.status) {
                setMessages(response.data.result.data.queries)
                setStatus(response.data.result.data.status)
                return
            }
            SweetAlert('warning', 'Warning!', response.data.message)
        }
        catch (error) {
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
    }

    return (
        <StyledReplyQuery>
            <div className='reply-query_content'>
                <div className='reply-query_content_top'>
                    <div className='reply-query_content_top_left'>
                        <button
                            type='button'
                            onClick={() => {
                                setReply(false)
                            }}
                        >
                            <img src='/images/back-arrow.svg' alt='back-arrow' />
                        </button>
                        <div className='reply-query_content_top_left_subject'>
                            <div className='avatar'>
                                <img src={profilePicture} alt='avatar' />
                            </div>
                            <div>
                                <h3>{queriesData.subject}</h3>
                                <span>
                                    {name} | {createdQueryDate} | Last Reply: {lastReply}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='reply-query_content_top_status'>
                        {status === 'PENDING' || status === 'CLOSED'
                            ? closed_pending_Status(status)
                            : status === 'IN_PROGRESS' && in_Progress_Status('In progress')
                        }
                    </div>
                </div>

                <div className='reply-query_content_request'>
                    <div className='original-request'>
                        <div></div>
                        <div className='text'>Original request</div>
                        <div></div>
                    </div>
                    <div className='description'>
                        <p>
                            {queriesData.description}
                        </p>
                    </div>
                </div>

                <StyledChats>
                    <Messages
                        id={id}
                        messages={messages}
                        profilePicture={profilePicture}
                    />
                </StyledChats>
            </div>

            <div className='reply-query_form'>
                <Formik
                    initialValues={{ message: "" }}
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
                                <div className='field-wrapper'>
                                    <div className='field-control'>
                                        <Field name="message">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        name='message'
                                                        placeholder="Please answer..."
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='btn-container'>
                                        <div></div>
                                        <button
                                            type='submit'
                                            className='reply-btn'
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </StyledReplyQuery>
    )
}

export default Index
const validationSchema = Yup.object({
    message: Yup.string().required('This field is required')
});