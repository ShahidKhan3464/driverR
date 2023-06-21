import React from 'react';
import moment from 'moment';
import { useGlobalContext } from 'contextApi';
import Skeleton from '@mui/material/Skeleton';
import { StyledNotifications, StyledHeading } from './style';

const Index = () => {
    const { loading, notifications } = useGlobalContext()
    const sortedNotifications = [...notifications].sort((a, b) => moment(b.receivingTime).diff(moment(a.receivingTime)))

    return (
        <StyledNotifications>
            <div className='heading'>
                <StyledHeading>Recent notifications</StyledHeading>
            </div>
            <div className='list'>
                {loading ? (
                    <Skeleton animation="wave" height={120} />
                ) : (
                    sortedNotifications.slice(0, 4).map((notification, index) => (
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