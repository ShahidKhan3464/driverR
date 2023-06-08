import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import Driver from './Driver';
import Company from './Company';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [queries, setQueries] = useState([])
    const [support, setSupport] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeChip, setActiveChip] = useState('All')

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props
        return (
            <div
                {...other}
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{ py: 2 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        )
    }

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setActiveChip('All')
    }

    const getData = useCallback(async (value) => {
        const params = { userType: value === 0 ? 'DRIVER' : value === 1 && 'COMPANY' }
        try {
            setLoading(true)
            const response = await api.get('/support-queries/view-all', params)
            if (response.data.status) {
                setSupport(response.data.result?.data || [])
                setQueries(response.data.result?.data || [])
                setLoading(false)
                return
            }
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

    useEffect(() => {
        getData(value)
    }, [value, getData])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#D8D8D8' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ className: 'indicator-border' }}
                >
                    <Tab label="Drivers" {...a11yProps(0)} />
                    <Tab label="Companies" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Driver
                    data={support}
                    loading={loading}
                    setData={setQueries}
                    activeChip={activeChip}
                    filteredItems={queries}
                    setActiveChip={setActiveChip}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Company
                    data={support}
                    loading={loading}
                    setData={setQueries}
                    activeChip={activeChip}
                    filteredItems={queries}
                    setActiveChip={setActiveChip}
                />
            </TabPanel>
        </Box>
    )
}

export default Index