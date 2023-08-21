import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import { Layout } from 'antd';
import EditForm from './EditForm';
import { ContentContainer } from './style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import { StyledTableHeading } from 'components/globaStyle';
import CircularProgress from '@mui/material/CircularProgress';
const { Content } = Layout;

const planServices = [
    'Post jobs (2 job posts are allowed)',
    'Show drivers profile without posting jobs (10)',
    "Show compatible drivers according to posted jobs",
    "Internal notes for interviews",
    "Video meeting for driver interviews",
    "A maximum number of applicants can apply for a job post (80)"
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [plans, setPlans] = useState()
    const [addons, setAddOns] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [singlePlan, setSinglePlan] = useState()

    const combinedData = plans?.map(plan => {
        const planName = plan.name.split(" ")[0].toLowerCase()
        const matchingAddOns = addons.filter(addOn => {
            const addOnName = addOn.name.split(" ")[0].toLowerCase()
            return planName === addOnName
        })

        const modifiedAddOns = matchingAddOns.map(addOn => {
            const addOnName = addOn.name.split(" ")[1].toLowerCase()
            const price = `${addOn.price}`

            if (addOnName === 'job') {
                return {
                    price,
                    text: `Extra job post price`,
                }
            }

            if (addOnName === 'contacts') {
                return {
                    price,
                    text: `10 driver profile price`,
                }
            }

            return ''
        })

        return { ...plan, addOns: modifiedAddOns }
    })

    const handleEdit = (plan) => {
        setIsEdit(true)
        setSinglePlan(plan)
    }

    const modifiedTextWithStatus = (plan, service, isFirstIndex) => {
        const isInactiveService = isFirstIndex &&
            (service === "Show compatible drivers according to posted jobs" ||
                service === "Internal notes for interviews")

        const serviceClass = !isInactiveService ? "active" : "in-active"

        return {
            text: service
                .replace(/Post jobs \(.*\)/, `Post jobs (${plan.numberPostsAllowed} job posts are allowed)`)
                .replace(/Show drivers profile without posting jobs \(.+\)/, `Show drivers profile without posting jobs (${plan.numberProfilesAllowed})`)
                .replace(/A maximum number of applicants can apply for a job post \(.+\)/, `A maximum number of applicants can apply for a job post (${plan.numberApplicantsAllowed})`),
            class: serviceClass
        }
    }

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/payment/view-all-products')
            if (response.data.status) {
                let products = response.data.result.data.filter((e) => e.planType === 'PRODUCT')
                let addons = response.data.result.data.filter((e) => e.planType === 'ADDON')
                products = products.sort((a, b) => a.price - b.price)
                addons = addons.sort((a, b) => a.price - b.price)
                setPlans(products)
                setAddOns(addons)
                setLoading(false)
            }
            else {
                SweetAlert('warning', 'Warning!', response.data.message)
                setLoading(false)
            }
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
        <Content>
            <ContentContainer>
                <div className='subscription'>
                    <div className='subscription_heading'>
                        <StyledTableHeading>Manage subscription</StyledTableHeading>
                    </div>
                    {isEdit
                        ? (
                            <EditForm
                                plan={singlePlan}
                                getData={getData}
                                setIsEdit={setIsEdit}
                            />
                        )
                        : (loading ? (
                            <div className='subscription_loading'>
                                <CircularProgress color="inherit" />
                            </div>
                        ) : (
                            <div className='subscription_plans'>
                                {combinedData?.map((plan, index) => {
                                    const isFirstIndex = index === 0
                                    return (
                                        <div key={plan.id} className='subscription_plans_plan'>
                                            <div className='subscription_plans_plan_top'>
                                                <div className='subscription_plans_plan_top_left'>
                                                    <h3 className='subscription-type'>{plan.name.split(' ')[0]}</h3>
                                                    <p className='subscription-price'>
                                                        €{plan.price}
                                                        <span className='duration'>/ Annual</span>
                                                    </p>
                                                </div>
                                                <div className='subscription_plans_plan_top_edit'>
                                                    <button type='button' onClick={() => handleEdit(plan)}>
                                                        <img src='/images/subscription-edit.svg' alt='edit' />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='subscription_plans_services'>
                                                {planServices.map((service, index) => {
                                                    const newObj = modifiedTextWithStatus(plan, service, isFirstIndex)
                                                    return (
                                                        <div key={index} className='subscription_plans_services_service'>
                                                            <div className={newObj.class}>
                                                                <img
                                                                    alt='active'
                                                                    src={`/images/${newObj.class === 'active' ? 'service-active' : 'service-inactive'}.svg`}
                                                                />
                                                            </div>
                                                            <span>{newObj.text}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div style={{ marginTop: '32px' }} className='subscription_plans_ad-ons'>
                                                <h3 style={{ marginBottom: '8px' }}>Ad-ons</h3>
                                                {plan.addOns.map((item, index) => {
                                                    return (
                                                        <div key={index} className='service'>
                                                            <div className="active">
                                                                <img
                                                                    alt='active'
                                                                    src='/images/service-active.svg'
                                                                />
                                                            </div>
                                                            <span>{item.text} {`(€${item.price})`}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))
                    }
                </div>
            </ContentContainer>
        </Content >
    )
}

export default Index