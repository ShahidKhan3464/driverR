import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
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
    const [companies, setCompanies] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCompanies = companies.filter((item) => {
        const searchMatch = !searchQuery
            || item.name.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-companies')
            const data = response.data.result.data
            const companiesApplications = data.filter(item => item.applicationStatus === 'REJECT')
            setCompanies(companiesApplications)
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
        const params = { companyId: id, applicationStatus, ...(causeOfRejection && { causeOfRejection }) }

        try {
            const response = await api.get('/super-admin/approve-company', params)
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
                    <div className='table_application-header'>
                        <StyledTableHeading>Company applications</StyledTableHeading>
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