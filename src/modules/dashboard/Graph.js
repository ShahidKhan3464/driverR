import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { StyledGraph, StyledHeading } from './style';

const data = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'May', 'JUN', 'JUL'],
    datasets: [
        {
            tension: 0.5,
            borderWidth: 3,
            pointRadius: 0,
            borderDash: [12, 12],
            borderStyle: 'dashed',
            borderColor: '#46DE70',
            data: [0, 13, 5, 6, 4, 11, 0],
        },
        {
            tension: 0.5,
            borderWidth: 3,
            pointRadius: 0,
            borderDash: [12, 12],
            borderStyle: 'dashed',
            borderColor: '#962DFF',
            data: [0, 18, 10, 10.5, 1, 13, 0],
        },
        {
            tension: 0.5,
            borderWidth: 3,
            pointRadius: 0,
            borderDash: [12, 12],
            borderStyle: 'dashed',
            borderColor: '#FF718B',
            data: [0, 10, 21, 10, 5, 15, 0],
        },
    ]
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            stepSize: 5,
            suggestedMin: 0,
            suggestedMax: 25,
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
        },

        x: {
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
    },
}

const Index = () => {

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
                <div></div>
            </div>
            <Line height={140} data={data} options={options} />
        </StyledGraph>
    )
}

export default Index