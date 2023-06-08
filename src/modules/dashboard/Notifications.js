import React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
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

    return (
        <StyledNotifications>
            <div className='heading'>
                <StyledHeading>Notifications</StyledHeading>
            </div>
            <div className='list'>
                <div className='list_item'>
                    <div className='list_item_avatar'>
                        <StyledBadge
                            variant="dot"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <img src='/images/avatar1.png' alt='avatar' />
                        </StyledBadge>
                    </div>
                    <div className='list_item_text'>
                        <p>
                            <span>Jhon james</span> applied for a job <span>Fedex truck driver</span>
                        </p>
                        <span className='time'>
                            1 day ago
                        </span>
                    </div>
                </div>

                <div className='list_item'>
                    <div className='list_item_avatar'>
                        <StyledBadge
                            variant="dot"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <img src='/images/avatar2.png' alt='avatar' />
                        </StyledBadge>
                    </div>
                    <div className='list_item_text'>
                        <p>
                            <span>G.Smith</span> applied for a job <span>Perma truck driver</span>
                        </p>
                        <span className='time'>
                            2 day ago
                        </span>
                    </div>
                </div>

                <div className='list_item'>
                    <div className='list_item_avatar'>
                        <img src='/images/avatar3.png' alt='avatar' />
                    </div>
                    <div className='list_item_text'>
                        <p>
                            <span>Mike</span> applied for a job <span>Perma truck driver</span>
                        </p>
                        <span className='time'>
                            3 day ago
                        </span>
                    </div>
                </div>

                <div className='list_item'>
                    <div className='list_item_avatar'>
                        <img src='/images/avatar4.png' alt='avatar' />
                    </div>
                    <div className='list_item_text'>
                        <p>
                            <span>Sam</span> applied for a job <span>Fedex truck driver</span>
                        </p>
                        <span className='time'>
                            3 day ago
                        </span>
                    </div>
                </div>
            </div>
        </StyledNotifications>
    )
}

export default Index