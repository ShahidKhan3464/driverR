import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import { getPlanType } from 'utils';
import { Line } from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import Dropdown from 'components/tabledropdown';
import { Chart as ChartJS } from 'chart.js/auto';
import { StyledGraph, StyledHeading } from './style';

const months = [
    { value: 1, text: '01 month' },
    { value: 2, text: '02 months' },
    { value: 3, text: '03 months' },
    { value: 4, text: '04 months' },
    { value: 5, text: '05 months' },
    { value: 6, text: '06 months' },
    { value: 7, text: '07 months' },
    { value: 8, text: '08 months' },
    { value: 9, text: '09 months' },
    { value: 10, text: '10 months' },
    { value: 11, text: '11 months' },
    { value: 12, text: '12 months' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [options, setOptions] = useState()
    const [graphData, setGraphData] = useState()
    const [loading, setLoading] = useState(true)

    const generateGraphData = (subscriptions, value = null) => {
        const limit = value ? value : 6
        const plans = Array.from(new Set(subscriptions.map((subscription) => subscription.planType)))

        const planMonths = {}
        plans.forEach((plan) => {
            planMonths[plan] = []
        })

        const getColor = (plan) => {
            switch (plan.toLowerCase()) {
                case 'basic':
                    return '#46DE70'
                case 'standard':
                    return '#962DFF'
                case 'premium':
                    return '#FF718B'
                default:
                    break
            }
        }

        const currentDate = new Date()
        const startDate = new Date(currentDate)
        startDate.setMonth(currentDate.getMonth() - limit + 1)

        // const earliestSubscriptionDate = new Date(Math.min(...subscriptions.map((subscription) => subscription.date)))
        // const currentMonth = earliestSubscriptionDate.getMonth()
        // const currentYear = earliestSubscriptionDate.getFullYear()

        const monthLabels = []

        for (let i = 0; i < limit; i++) {
            // const monthIndex = (currentMonth + i) % 12
            // const year = currentYear + Math.floor((currentMonth + i) / 12)

            // const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'short' })
            // monthLabels.push(monthName)

            const monthIndex = (startDate.getMonth() + i) % 12
            const year = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12)

            const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'short' })
            monthLabels.push(monthName)

            plans.forEach((plan) => {
                const matchingSubscriptions = subscriptions.filter((subscription) => subscription.planType === plan)
                const matchingSubscriptionsInMonth = matchingSubscriptions.filter((subscription) => {
                    const subscriptionMonth = subscription.date.getMonth()
                    const subscriptionYear = subscription.date.getFullYear()
                    return subscriptionMonth === monthIndex && subscriptionYear === year
                })

                planMonths[plan].push(matchingSubscriptionsInMonth.length)
            })
        }

        const graphDatasets = Object.keys(planMonths).map((plan) => ({
            label: plan,
            fill: false,
            tension: 0.5,
            borderWidth: 3,
            pointRadius: 0,
            borderDash: [12, 12],
            borderStyle: 'dashed',
            data: planMonths[plan],
            borderColor: getColor(plan),
        }))

        const minDataValue = Math.min(...graphDatasets.flatMap((dataset) => dataset.data))
        const maxDataValue = Math.max(...graphDatasets.flatMap((dataset) => dataset.data))
        const stepSize = Math.ceil((maxDataValue - minDataValue) / 5)

        const yAxesOptions = {
            stepSize: stepSize,
            suggestedMin: minDataValue,
            suggestedMax: maxDataValue,
            border: { display: false },
            grid: { color: '#E5E5EF' },
            ticks: {
                borderWidth: 2,
                color: '#615E83',
                font: {
                    size: 14,
                    weight: '400',
                    style: 'normal',
                    lineHeight: '18px',
                    family: 'SF Pro Text',
                },
            },
        }

        const xAxesOptions = {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: '#615E83',
                font: {
                    size: 12,
                    weight: '400',
                    style: 'normal',
                    lineHeight: '16px',
                    family: 'SF Pro Text',
                },
            },
        }

        const updatedOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: yAxesOptions,
                x: xAxesOptions,
            },
        }

        return {
            labels: monthLabels,
            datasets: graphDatasets,
            options: updatedOptions,
        }
    }

    const handleGraphData = (data, value) => {
        const updatedData = generateGraphData(data, value)
        setGraphData(updatedData)
    }

    const getData = useCallback(async () => {
        try {
            const response = await api.get('/payment/transactions')
            const subscriptions = response.data.result.data.map(item => {
                return {
                    date: new Date(item.stripeSubscriptionDetails.created * 1000),
                    planType: item?.planName
                }
            })
            if (subscriptions) {
                const updatedData = generateGraphData(subscriptions)
                setData(subscriptions)
                setGraphData(updatedData)
                setOptions(updatedData.options)
            }
            setLoading(false)
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
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <StyledGraph>
            <div className='header'>
                <StyledHeading>Purchased plans</StyledHeading>
                <div className='plan-type'>
                    <div>
                        <div className='circle'></div>
                        <span>Basic</span>
                    </div>
                    <div>
                        <div className='circle'></div>
                        <span>Standard</span>
                    </div>
                    <div>
                        <div className='circle'></div>
                        <span>Premium</span>
                    </div>
                </div>
                <div className='select-month'>
                    <Dropdown
                        name=''
                        options={months}
                        defaultValue="Select months"
                        handleFilterChange={(name, value) => handleGraphData(data, value)}
                    />
                </div>
            </div>
            {loading ? (
                <Skeleton
                    animation="wave"
                    sx={{
                        height: '65%',
                        transform: 'inherit',
                        '@media screen and (max-width: 1280px)': {
                            height: '40%'
                        },
                        '@media screen and (max-width: 520px)': {
                            height: '20%'
                        }
                    }}
                />
            ) : (
                <Line height={180} data={graphData} options={options} />
            )}
        </StyledGraph>
    )
}

export default Index