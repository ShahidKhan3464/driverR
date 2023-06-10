import React, { useState } from 'react';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import ReplyQuery from './ReplyQuery';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { StyledSupportQuery } from '../style';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledStatus, StyledNoResultsFound, StyledHeading, infoLink, grey600, grey400 } from 'components/globaStyle';

const Index = ({ data, filteredItems, activeChip, loading, setData, setActiveChip }) => {
    const [page, setPage] = useState(1)
    const [reply, setReply] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const noResultsFound = filteredItems.length === 0
    const [queriesData, setQueriesData] = useState(null)

    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedData = filteredItems.slice(startIndex, endIndex)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(1)
    }

    const handleFilter = (status) => {
        const filteredItems = data.filter(item => item.status === status)
        setActiveChip(status)
        setData(filteredItems)
    }

    const handleViewQuery = (data) => {
        setReply(true)
        setQueriesData(data)
    }

    return (
        <StyledSupportQuery>
            {!reply ? (
                <React.Fragment>
                    <div className='stack'>
                        <Chip
                            variant="outlined"
                            label="All request"
                            onClick={() => {
                                setData(data)
                                setActiveChip('All')
                            }}
                            icon={<p className='number'>{data.length}</p>}
                            sx={{ '& .MuiChip-label': { color: activeChip === 'All' ? grey600 : grey400 } }}
                        />
                        <Chip
                            label="Pending"
                            variant="outlined"
                            onClick={() => handleFilter('PENDING')}
                            sx={{ '& .MuiChip-label': { color: activeChip === 'PENDING' ? grey600 : grey400 } }}
                        />
                        <Chip
                            variant="outlined"
                            label="In progress"
                            onClick={() => handleFilter('IN_PROGRESS')}
                            sx={{ '& .MuiChip-label': { color: activeChip === 'IN_PROGRESS' ? grey600 : grey400 } }}
                        />
                        <Chip
                            label="Closed"
                            variant="outlined"
                            onClick={() => handleFilter('CLOSED')}
                            sx={{ '& .MuiChip-label': { color: activeChip === 'CLOSED' ? grey600 : grey400 } }}
                        />
                    </div>
                    <div className='queries'>
                        <TableContainer
                            component={Paper}
                            sx={{ borderRadius: '12px', border: '1px solid #E7E7E7', boxShadow: 'none' }}
                        >
                            <Table>
                                <TableHead sx={{ background: '#EFEFEF' }}>
                                    <TableRow>
                                        {/* <StyledTableCell>Id</StyledTableCell> */}
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Subject</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Latest message</StyledTableCell>
                                        <StyledTableCell>View</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                                <div
                                                    style={{
                                                        height: '45vh',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : noResultsFound ? (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                                <StyledNoResultsFound>
                                                    <div className='container'>
                                                        <img src='/images/search-not-found.svg' alt='not-found' />
                                                        <StyledHeading>No tickets found</StyledHeading>
                                                    </div>
                                                </StyledNoResultsFound>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedData?.map((item, index) => (
                                            <StyledTableRow key={index}>
                                                {/* <StyledTableCell>{item._id}</StyledTableCell> */}
                                                <StyledTableCell
                                                    size="12px"
                                                    weight="500"
                                                    color="#2C2E3E"
                                                >
                                                    <div
                                                        style={{
                                                            gap: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <img src='/images/driver-logo.svg' alt='driver' />
                                                        <div>
                                                            {`${item.driverId?.firstName} ${item.driverId?.lastName}`}
                                                            <span className='email'>{item.driverId?.email}</span>
                                                        </div>
                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell style={{ textTransform: 'lowercase' }}>{item.subject}</StyledTableCell>
                                                <StyledTableCell>
                                                    <StyledStatus
                                                        width={item.status === 'IN_PROGRESS' ? '85px' : '65px'}
                                                        color={item.status === 'PENDING'
                                                            ? infoLink
                                                            : item.status === 'CLOSED'
                                                                ? grey600
                                                                : item.status === 'IN_PROGRESS' && '#22C55E'
                                                        }
                                                        background={item.status === 'PENDING'
                                                            ? "#E8ECFF"
                                                            : item.status === 'CLOSED'
                                                                ? "#D1D5DB"
                                                                : item.status === 'IN_PROGRESS' && 'rgba(189, 232, 205, 0.4)'
                                                        }
                                                    >
                                                        {item.status === 'PENDING'
                                                            ? 'Pending'
                                                            : item.status === 'IN_PROGRESS'
                                                                ? 'In progress'
                                                                : item.status === 'CLOSED' && 'Closed'
                                                        }
                                                    </StyledStatus>
                                                </StyledTableCell>
                                                <StyledTableCell>{moment(item.queries[item.queries.length - 1]?.createdAt).fromNow()}</StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    <button
                                                        type='button'
                                                        className='view-btn'
                                                        onClick={() => handleViewQuery(item)}
                                                    >
                                                        <img src='/images/view-query.svg' alt='view-query' />
                                                    </button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {!noResultsFound && !loading && (
                        <Pagination
                            page={page}
                            rowsPerPage={rowsPerPage}
                            count={filteredItems.length}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </React.Fragment>
            ) : (
                <ReplyQuery queriesData={queriesData} setReply={setReply} />
            )}
        </StyledSupportQuery>
    )
}

export default Index