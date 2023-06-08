import React from 'react';
import moment from 'moment';
import { getPlanType } from './getPlanType';
import { StyledReceiptContent } from './style';

const Index = ({ data, componentRef = null }) => {

    return (
        <StyledReceiptContent ref={componentRef}>
            <div className='header'>
                <h2>TIRminator</h2>
            </div>

            <div className='body'>
                <h3>Transaction receipt</h3>
                <p className='amount'>€{Math.floor(data?.amount / 100)}</p>

                <div className='trsc-history'>
                    <div className='date-time'>
                        <span>{moment().format('DD MMM YYYY')}</span>
                        <span>{moment().format('h:mm A')}</span>
                    </div>

                    <div className='detail'>
                        <p className='key'>Company name<span className='value'>{data?.name}</span></p>
                        <p className='key'>Transaction id<span className='value'>{data?.transactionId}</span></p>
                        <p className='key'>Plan type <span className='value'>{getPlanType(data?.planType)}</span></p>
                        <p className='key'>Date <span className='value'>{moment(data?.date).format('DD MMM YYYY')}</span></p>
                        <p className='key'>Time <span className='value'>{moment(data?.date, 'HH:mm').format('hh:mm A')}</span></p>
                    </div>
                </div>
            </div>

            <div className='footer'>
                <p>© 2023 TIRminator. All right reserved</p>
            </div>
        </StyledReceiptContent>
    )
}

export default Index