import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import { ContentContainer } from '../style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/tabledropdown';
import { StyledTableHeading } from 'components/globaStyle';
import TableSearchHandler from 'components/tableSearchField';
const { Content } = Layout;

const status = [
    { value: true, text: 'Active' },
    { value: false, text: 'Inactive' },
]

const gender = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
]

const equipmentType = [
    { value: 'box', text: 'Box' },
    { value: 'bulk', text: 'Bulk' },
    { value: 'frigo', text: 'Frigo' },
    { value: 'chassie', text: 'Chassie' },
    { value: 'oversized', text: 'Oversized' },
    { value: 'tautliner', text: 'Tautliner' },
    { value: 'jumbo (40 Ton)', text: 'Jumbo (40 Ton)' },
    { value: 'car transporter', text: 'Car transporter' },
    { value: 'tautliner & box (12 ton)', text: 'Tautliner & Box (12 Ton)' },
    { value: 'tautliner & box (3.5 ton)', text: 'Tautliner & Box (3.5 Ton)' },
    { value: 'tautliner & box (7.5 ton)', text: 'Tautliner & Box (7.5 Ton)' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState({
        status: '',
        gender: '',
        equipmentType: '',
    })

    const filteredDrivers = drivers.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`
        const statusMatch = filter.status === '' || item.isActive === filter.status
        const equipmentMatch = !filter.equipmentType || item.equipmentType.map(element => element.toLowerCase()).includes(filter.equipmentType)
        const genderMatch = !filter.gender || item.gender.toLowerCase() === filter.gender

        const searchMatch = !searchQuery
            || fullName.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return statusMatch && equipmentMatch && genderMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-drivers')
            const data = response.data.result.data
            const approvedDrivers = data.filter(item => item.profileStatus === 'APPROVE')
            const sortedData = [...approvedDrivers].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            setDrivers(sortedData)
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
            SweetAlert('error', 'Error!', `${error.message}`)
            setLoading(false)
        }
    }, [])

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value })
    }

    const handleApplication = async (id, status) => {
        const profileStatus = status
        const params = {
            driverId: id,
            profileStatus,
        }

        try {
            const response = await api.put('/super-admin/manage-driver-profile', params)
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

    const handleDriverStatus = async (id, newStatus) => {
        const data = { driverId: id, isActive: newStatus === 'Active' ? true : false }
        try {
            await api.put('/super-admin/active-inactive-driver', data)
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
                        <StyledTableHeading>Verified drivers</StyledTableHeading>
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
                                name="gender"
                                options={gender}
                                defaultValue="Gender"
                                handleFilterChange={handleFilterChange}
                            />
                            <Dropdown
                                name="equipmentType"
                                options={equipmentType}
                                defaultValue="Equipment type"
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List
                        loading={loading}
                        data={filteredDrivers}
                        handleApplication={handleApplication}
                        handleDriverStatus={handleDriverStatus}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index