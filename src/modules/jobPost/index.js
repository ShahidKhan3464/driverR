import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import { Layout } from 'antd';
import { ContentContainer } from './style';
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

const routeType = [
    { value: 'albania', text: 'Albania' },
    { value: 'andorra', text: 'Andorra' },
    { value: 'austria', text: 'Austria' },
    { value: 'belarus', text: 'Belarus' },
    { value: 'belgium', text: 'Belgium' },
    { value: 'bulgaria', text: 'Bulgaria' },
    { value: 'croatia', text: 'Croatia' },
    { value: 'czech republic', text: 'Czech Republic' },
    { value: 'denmark', text: 'Denmark' },
    { value: 'france', text: 'France' },
    { value: 'germany', text: 'Germany' },
    { value: 'greece', text: 'Greece' },
    { value: 'hungary', text: 'Hungary' },
    { value: 'italy', text: 'Italy' },
    { value: 'luxemburg', text: 'Luxemburg' },
    { value: 'moldova', text: 'Moldova' },
    { value: 'netherlands', text: 'Netherlands' },
    { value: 'norway', text: 'Norway' },
    { value: 'poland', text: 'Poland' },
    { value: 'portugalia', text: 'Portugalia' },
    { value: 'serbia', text: 'Serbia' },
    { value: 'slovakia', text: 'Slovakia' },
    { value: 'slovenia', text: 'Slovenia' },
    { value: 'spain', text: 'Spain' },
    { value: 'sweden', text: 'Sweden' },
    { value: 'switzerland', text: 'Switzerland' },
    { value: 'turkey', text: 'Turkey' },
    { value: 'ucraina', text: 'Ucraina' },
    { value: 'united kingdom', text: 'United Kingdom' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState({
        status: '',
        routeType: '',
        equipmentType: '',
    })

    const filteredJobs = jobs.filter((item) => {
        const statusMatch = filter.status === '' || item.isActive === filter.status
        const routeMatch = !filter.routeType || item.routeType.toLowerCase() === filter.routeType
        const equipmentMatch = !filter.equipmentType || item.equipmentType.toLowerCase() === filter.equipmentType
        const searchMatch = !searchQuery
            || item.title.toLowerCase().includes(searchQuery.toLowerCase())
            || item.companyId.name.toLowerCase().includes(searchQuery.toLowerCase())
        return statusMatch && routeMatch && equipmentMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-jobs')
            setJobs(response.data.result.data)
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

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value })
    }

    const handleJobDelete = async (id) => {
        const params = { jobId: id }
        try {
            await api.delete('/super-admin/remove-job', params)
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

    const handleJobStatus = async (id, newStatus) => {
        const data = { id, isActive: newStatus === 'Active' ? true : false }
        try {
            await api.put('/super-admin/active-inactive-job', data)
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
                        <StyledTableHeading>Job post</StyledTableHeading>
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
                                name="equipmentType"
                                options={equipmentType}
                                defaultValue="Equipment type"
                                handleFilterChange={handleFilterChange}
                            />
                            <Dropdown
                                name="routeType"
                                options={routeType}
                                defaultValue="Route type"
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List data={filteredJobs} loading={loading} handleJobDelete={handleJobDelete} handleJobStatus={handleJobStatus} />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index