import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { Layout } from 'antd';
import Dialog from 'components/dialog';
import Radio from '@mui/material/Radio';
import DatePicker from "react-datepicker";
import { getPlanType } from './getPlanType';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/tabledropdown';
import RadioGroup from '@mui/material/RadioGroup';
import TableSearchHandler from 'components/tableSearchField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { StyledTableHeading, primaryBlue } from 'components/globaStyle';
import { ContentContainer, StyledExportButton, StyledDatepickerContainer } from './style';
const { Content } = Layout;

const subscription = [
    { value: 'standard', text: 'Standard' },
    { value: 'premium', text: 'Premium' },
]

const radiosButton = [
    { value: 'xlsx', label: '.XLSX' },
    { value: 'pdf', label: 'PDF' }
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [value, setValue] = useState('xlsx')
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectDate, setSelectDate] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState({ subscription: "" })

    const filteredTransactions = transactions.filter((item) => {
        const subscriptionMatch = !filter.subscription || getPlanType(item.planType).toLowerCase() === filter.subscription
        const searchMatch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())

        if (selectDate) {
            const selectedDate = new Date(selectDate.setHours(0, 0, 0, 0))
            const itemDate = new Date(item.date.setHours(0, 0, 0, 0))
            return subscriptionMatch && searchMatch && selectedDate.getTime() === itemDate.getTime()
        }
        return subscriptionMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/payment/transactions')
            const manipulatedData = response.data.result.data.data.map(item => {
                return {
                    name: item.customer_name,
                    transactionId: item.number,
                    planType: item.lines.data[0].description,
                    date: new Date(item.period_start * 1000),
                    amount: item.total
                }
            })
            setTransactions(manipulatedData)
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

    const handleExport = () => {
        if (value === 'xlsx') {
            const xlsxData = selected.map(({ name, transactionId, planType, date, amount }) => ({
                'Company name': name,
                'Transaction id': transactionId,
                'Plan type': getPlanType(planType),
                'Date': moment(date).format('DD MMM YYYY'),
                'Time': moment(date, 'HH:mm').format('hh:mm A'),
                'Amount': `€${Math.floor(amount / 100)}`
            }))

            const xlsxHeaders = [
                { label: "Company name", key: "Company name" },
                { label: "Transaction id", key: "Transaction id" },
                { label: "Plan type", key: "Plan type" },
                { label: "Date", key: "Date" },
                { label: "Time", key: "Time" },
                { label: "Amount", key: "Amount" }
            ]

            const xlsxFilename = 'transaction_data.xlsx'

            const xlsxExport = [
                xlsxHeaders,
                ...xlsxData
            ]

            const workbook = XLSX.utils.book_new()
            const worksheet = XLSX.utils.json_to_sheet(xlsxExport, { header: xlsxHeaders.map(header => header.label) })
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

            const workbookOutput = XLSX.write(workbook, {
                type: 'binary',
                bookType: 'xlsx',
            })

            const buffer = new ArrayBuffer(workbookOutput.length)
            const view = new Uint8Array(buffer)
            for (let i = 0; i < workbookOutput.length; i++) {
                view[i] = workbookOutput.charCodeAt(i) & 0xff
            }

            const blob = new Blob([buffer], { type: 'application/octet-stream' })

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // For IE browser
                window.navigator.msSaveOrOpenBlob(blob, xlsxFilename)
            }
            else {
                // For other browsers
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = xlsxFilename
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
            }
        }

        else if (value === 'pdf') {
            alert('pdf')
        }
    }

    const exportContent = () => {
        return (
            <React.Fragment>
                <div className='export-icon'>
                    <img src='/images/export-as.svg' alt='export-as' />
                </div>

                <div className='content'>
                    <h3>Save</h3>
                    <RadioGroup
                        row
                        value={value}
                        sx={{ justifyContent: 'center' }}
                        onChange={(e) => setValue(e.target.value)}
                    >
                        {radiosButton.map((item) => {
                            return (
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#A2ACBD',
                                                '&.Mui-checked': {
                                                    color: primaryBlue,
                                                    'svg:last-child': {
                                                        transform: 'scale(1.3)'
                                                    }
                                                },
                                            }}
                                        />
                                    }
                                    sx={{
                                        marginLeft: '3px',
                                        marginRight: '15px',
                                        '& .MuiFormControlLabel-label': {
                                            color: '#3E4756',
                                            fontSize: '16px',
                                            fontWeight: '400',
                                            lineHeight: '121.4%',
                                            fontFamily: 'Poppins',
                                        },
                                    }}
                                />
                            )
                        })}
                    </RadioGroup>
                </div>

                <div className='btn-container'>
                    <button
                        type='button'
                        className='cancel-btn'
                        onClick={() => setDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='export-btn'
                        onClick={() => {
                            handleExport()
                            setDialogOpen(false)
                        }}
                    >
                        Export
                    </button>
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Content>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={exportContent()}
                />
            )}
            <ContentContainer>
                <div className='table'>
                    <div className='table_header'>
                        <div className='table_header_heading'>
                            <StyledTableHeading>Transaction history</StyledTableHeading>
                        </div>
                        <StyledExportButton onClick={() => setDialogOpen(true)}>
                            <img src='/images/export-blue.svg' alt='export' />
                            Export
                        </StyledExportButton>
                    </div>
                    <div className='table_control-elements'>
                        <div className='table_control-elements_filterbox'>
                            <StyledDatepickerContainer selectDate={selectDate}>
                                <DatePicker
                                    isClearable
                                    selected={selectDate}
                                    placeholderText="Date"
                                    dateFormat="d MMM yyyy"
                                    onChange={(date) => setSelectDate(date)}
                                />
                            </StyledDatepickerContainer>
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
                        selected={selected}
                        setSelected={setSelected}
                        data={filteredTransactions}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index