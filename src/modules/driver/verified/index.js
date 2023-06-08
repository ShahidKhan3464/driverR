import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
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

const experience = [
    { value: '1', text: '0-1 year' },
    { value: '2', text: '1-2 years' },
    { value: '3', text: '2-3 years' },
    { value: '4', text: '3-4 years' },
    { value: '5', text: '+5 years' },
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
        experience: '',
        employmentStatus: '',
    })

    const filteredDrivers = drivers.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`
        const statusMatch = filter.status === '' || item.isActive === filter.status
        const employmentMatch = !filter.employmentStatus || item.employmentStatus.toLowerCase() === filter.employmentStatus
        const genderMatch = !filter.gender || item.gender.toLowerCase() === filter.gender
        const experienceMatch = !filter.experience || item.drivingExperience === filter.experience
        const searchMatch = !searchQuery
            || fullName.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return statusMatch && employmentMatch && genderMatch && experienceMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-drivers')
            const data = response.data.result.data
            const approvedDrivers = data.filter(item => item.applicationStatus === 'APPROVE')
            setDrivers(approvedDrivers)
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

    // const handleDriverDelete = async (id) => {
    //     const data = { driverId: id }
    //     try {
    //         await api.delete('/super-admin/remove-driver', data)
    //         getData()
    //     }
    //     catch (error) {
    //         const tokenExpired = error.response?.data.message
    //         if (tokenExpired === 'Token expired, access denied') {
    //             localStorage.clear()
    //             navigate("/")
    //             return
    //         }
    //         SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    //     }
    // }

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
                                name="experience"
                                options={experience}
                                defaultValue="Experience"
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List data={filteredDrivers} loading={loading} handleDriverStatus={handleDriverStatus} />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index