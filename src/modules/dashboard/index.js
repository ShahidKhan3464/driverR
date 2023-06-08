import React from 'react';
import Cards from './Cards';
import Graph from './Graph';
import { Layout } from 'antd';
import ActiveJobs from './ActiveJobs';
import Notifications from './Notifications';
import { useNavigate } from 'react-router-dom';
import TransactionsDetails from './TranscDetails';
import { ContentContainer, StyledHeading } from './style';
const { Content } = Layout;

const Index = () => {
    const navigate = useNavigate()

    return (
        <Content>
            <ContentContainer>
                <React.Fragment>
                    <Cards />
                    <div className='reports'>
                        <Graph />
                        <Notifications />
                    </div>
                    <div className='tables-container'>
                        <div className='table'>
                            <div className='table_header'>
                                <StyledHeading>Active jobs</StyledHeading>
                                <button type='button' onClick={() => navigate('/admin/job/list')}>View all</button>
                            </div>
                            <ActiveJobs />
                        </div>
                        <div className='table'>
                            <div className='table_header'>
                                <StyledHeading>Transactions details</StyledHeading>
                                <button type='button' onClick={() => navigate('/admin/transaction/list')}>View all</button>
                            </div>
                            <TransactionsDetails />
                        </div>
                    </div>
                </React.Fragment>
            </ContentContainer>
        </Content>
    )
}

export default Index