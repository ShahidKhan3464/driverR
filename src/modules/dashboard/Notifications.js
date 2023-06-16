import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import moment from 'moment';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import { StyledNotifications, StyledHeading } from './style';

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        top: '-5px',
        left: '-2px',
        height: '7px',
        minWidth: '7px',
        backgroundColor: '#FF0000',
    },
}))

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/notification/get-all-admin-notification')
            if (response.data.status) {
                setNotifications(response.data.result.data)
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

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <StyledNotifications>
            <div className='heading'>
                <StyledHeading>Recent notifications</StyledHeading>
                {/* <div className='list_item_avatar'>
                    <StyledBadge
                        variant="dot"
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <img src='/images/avatar1.png' alt='avatar' />
                    </StyledBadge>
                </div> */}
                {/* <span>Jhon james</span> applied for a job <span>Fedex truck driver</span> */}
            </div>
            <div className='list'>
                {loading ? (
                    <Skeleton animation="wave" height={120} />
                ) : (
                    notifications.slice(0, 4).map((notification, index) => (
                        <div key={index} className='list_item'>
                            <div className='list_item_text'>
                                <h3>{notification.title}</h3>
                                <p>
                                    {notification.message}
                                </p>
                                <span className='time'>
                                    {moment(notification.receivingTime).fromNow()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </StyledNotifications>
    )
}

export default Index