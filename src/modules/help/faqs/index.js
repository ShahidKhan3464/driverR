import React from 'react';
import ApiClient from 'api';
import Driver from './Driver';
import Company from './Company';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Index = ({ faqs, value, getData, loading, setValue }) => {
    const api = new ApiClient()
    const navigate = useNavigate()

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
        if (newValue === 0) {
            getData('DRIVER')
        }
        else if (newValue === 1) {
            getData('COMPANY')
        }
    }

    const handleDeleteFaqs = async (id) => {
        const targetedUser = value === 0 ? 'DRIVER' : value === 1 && 'COMPANY'
        const data = { faqId: id }
        try {
            const response = await api.delete('/faqs/remove', data)
            if (response.data.status) {
                SweetAlert('success', 'Success', response.data.message)
                getData(targetedUser)
            }
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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#D8D8D8' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ className: 'indicator-border' }}
                >
                    <Tab label="Driver FAQ’s" {...a11yProps(0)} />
                    <Tab label="Company FAQ’s" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Driver
                    faqs={faqs}
                    value={value}
                    getData={getData}
                    loading={loading}
                    handleDeleteFaqs={handleDeleteFaqs}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Company
                    faqs={faqs}
                    value={value}
                    getData={getData}
                    loading={loading}
                    handleDeleteFaqs={handleDeleteFaqs}
                />
            </TabPanel>
        </Box>
    )
}

export default Index