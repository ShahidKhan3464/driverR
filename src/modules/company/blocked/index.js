import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import { ContentContainer } from '../style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import { StyledTableHeading } from 'components/globaStyle';
import TableSearchHandler from 'components/tableSearchField';
const { Content } = Layout;

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [blockedCompanies, setBlockedCompanies] = useState([])

    const filteredCompanies = blockedCompanies.filter((item) => {
        const searchMatch = !searchQuery
            || item.name.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        const params = { blocked: true }

        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-companies', params)
            const sortedData = [...response.data.result.data].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            setBlockedCompanies(sortedData)
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

    const handleApplication = async (id, status) => {
        const applicationStatus =
            status === 'approve'
                ? 'APPROVE'
                : status === 'reject'
                    ? 'REJECT'
                    : status === 'block'
                    && 'BLOCK'

        const causeOfRejection = applicationStatus === 'REJECT' ? 'Incomplete' : undefined
        const params = { driverId: id, applicationStatus, ...(causeOfRejection && { causeOfRejection }) }

        try {
            const response = await api.get('/super-admin/approve-driver', params)
            if (response.data.status) {
                if (applicationStatus === 'APPROVE') {
                    SweetAlert('success', 'Approved', 'This application has been approved Successfully')
                }
                else if (applicationStatus === 'REJECT') {
                    SweetAlert('success', 'Rejected', 'This application has been rejected Successfully')
                }
                else if (applicationStatus === 'BLOCK') {
                    SweetAlert('success', 'Blocked', 'This application has been blocked Successfully')
                }
            }
            getData()
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
        getData()
    }, [getData])

    return (
        <Content>
            <ContentContainer>
                <div className='table'>
                    <div className='table_header'>
                        <StyledTableHeading>Blocked companies</StyledTableHeading>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List
                        loading={loading}
                        data={filteredCompanies}
                        handleApplication={handleApplication}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index