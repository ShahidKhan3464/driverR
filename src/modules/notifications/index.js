import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import { ContentContainer } from './style';
import { useGlobalContext } from 'contextApi';
import { styled } from '@mui/material/styles';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import { StyledTableHeading } from 'components/globaStyle';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
const { Content } = Layout;

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        height: '8px',
        minWidth: '8px',
        backgroundColor: '#FF0000',
    },
}))

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const { getNotifications } = useGlobalContext()
    const [notifications, setNotifications] = useState([])
    const [allNotifications, setAllNotifications] = useState([])
    const hasUnreadNotifications = notifications.some(notification => !notification.markAsRead)
    const sortedNotifications = [...notifications].sort((a, b) => moment(b.receivingTime).diff(moment(a.receivingTime)))

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/notification/get-all-admin-notification')
            if (response.data.status) {
                setNotifications(response.data.result.data)
                setAllNotifications(response.data.result.data)
                setLoading(false)
                return
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
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }, [])

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked) {
            const unreadMessages = allNotifications.filter(notification => !notification.markAsRead)
            setNotifications(unreadMessages)
            return
        }
        setNotifications(allNotifications)
    }

    const handleReadNotifications = async () => {
        const markAsRead = allNotifications
            .filter(notification => !notification.markAsRead)
            .map(notification => notification._id)

        const data = { userType: 'ADMIN', notificationsIds: markAsRead }

        try {
            const response = await api.put('/notification/mark-as-read', data)
            if (response.data.status) {
                fetchData()
                getNotifications()
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

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <Content>
            <ContentContainer>
                <div className='notifications'>
                    <div className='notifications_header'>
                        <StyledTableHeading>Notifications</StyledTableHeading>
                        <div className='notifications_header_right'>
                            <div className='show-unread'>
                                <FormGroup>
                                    <FormControlLabel
                                        className="customLabel"
                                        label="Only show unread"
                                        control={
                                            <Switch
                                                checked={checked}
                                                onChange={handleChange}
                                            />
                                        }
                                    />
                                </FormGroup>
                            </div>

                            <div className='mark-asread'>
                                {hasUnreadNotifications && (
                                    <div className='mark-asread'>
                                        <p onClick={handleReadNotifications}>
                                            Mark all as read
                                            <img src='/images/check-mark.svg' alt='check-mark' />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='notifications_list'>
                        {loading ? (
                            <div
                                style={{
                                    height: '45vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CircularProgress color="inherit" />
                            </div>
                        ) : (
                            sortedNotifications.map((notification, index) => {
                                return (
                                    <div key={index} className='notifications_list_item'>
                                        <div>
                                            <div className='left'>
                                                {!notification.markAsRead && (
                                                    <StyledBadge
                                                        variant="dot"
                                                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                    />
                                                )}
                                                <div className='bell-icon'>
                                                    <img src='/images/bell-icon.svg' alt='bell-icon' />
                                                </div>
                                            </div>

                                            <div className='text'>
                                                <h3 className='title'>{notification.title}</h3>
                                                <p className='message'>{notification.message}</p>
                                            </div>
                                        </div>
                                        <p className='duration'>{moment(notification.receivingTime).fromNow()}</p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index