import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import moment from 'moment';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow } from 'components/globaStyle';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [activeJobs, setActiveJobs] = useState([])

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-jobs')
            const activeJobs = response.data.result.data.filter(item => item.isActive)
            setActiveJobs(activeJobs)
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
        getData()
    }, [getData])

    return (
        <TableContainer
            component={Paper}
            sx={{ borderRadius: '12px', border: '1px solid #E7E7E7', boxShadow: 'none' }}
        >
            <Table>
                <TableHead sx={{ background: '#EFEFEF' }}>
                    <TableRow>
                        <StyledTableCell color="#374151">Company</StyledTableCell>
                        <StyledTableCell color="#374151">Job title</StyledTableCell>
                        <StyledTableCell color="#374151">Job type</StyledTableCell>
                        <StyledTableCell color="#374151">Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: 4 }, (_, colIndex) => (
                                    <StyledTableCell key={colIndex}>
                                        <Skeleton animation="wave" />
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        activeJobs.slice(0, 8).map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    size="12px"
                                    weight="500"
                                    color="#2C2E3E"
                                >
                                    {item.companyId?.name}
                                </StyledTableCell>
                                <StyledTableCell>{item.title}</StyledTableCell>
                                <StyledTableCell>Full time</StyledTableCell>
                                <StyledTableCell>{moment(item.createdAt).format('L')}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index