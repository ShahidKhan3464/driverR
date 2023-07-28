import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import { ContentContainer } from '../style';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import Dropdown from 'components/tabledropdown';
import { StyledTableHeading } from 'components/globaStyle';
import TableSearchHandler from 'components/tableSearchField';
const { Content } = Layout;

const status = [
    { value: true, text: 'Active' },
    { value: false, text: 'Inactive' },
]

const subscription = [
    { value: 'basic', text: 'Basic' },
    { value: 'premium', text: 'Premium' },
    { value: 'standard', text: 'Standard' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [companies, setCompanies] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState({
        status: '',
        subscription: '',
    })

    const filteredCompanies = companies.filter((item) => {
        const statusMatch = filter.status === '' || item.isActive === filter.status
        const searchMatch = !searchQuery
            || item.name.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return statusMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-companies')
            const data = response.data.result.data
            const registeredCompanies = data.filter(item => item.profileStatus === 'APPROVE')
            const sortedData = [...registeredCompanies].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            setCompanies(sortedData)
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
        const profileStatus = status
        const params = {
            companyId: id,
            profileStatus,
        }

        try {
            const response = await api.put('/super-admin/manage-company-profile', params)
            if (response.data.status) {
                if (profileStatus === 'BLOCK') {
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

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value })
    }

    const handleCompanyStatus = async (id, newStatus) => {
        const data = { companyId: id, isActive: newStatus === 'Active' ? true : false }
        try {
            await api.put('/super-admin/active-inactive-company', data)
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
                    <div className='table_heading'>
                        <StyledTableHeading>Registered companies</StyledTableHeading>
                    </div>
                    <div className='table_control-elements'>
                        <div className='table_control-elements_filterbox'>
                            <Dropdown
                                name="status"
                                options={status}
                                defaultValue="Status"
                                handleFilterChange={handleFilterChange}
                            />
                            <Dropdown
                                name="subscription"
                                options={subscription}
                                defaultValue="Subscription plan"
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List
                        loading={loading}
                        data={filteredCompanies}
                        handleApplication={handleApplication}
                        handleCompanyStatus={handleCompanyStatus}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index