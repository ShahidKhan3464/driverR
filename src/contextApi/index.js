import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import ApiClient from 'api';
import SweetAlert from 'components/sweetAlert';

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const api = new ApiClient()
    const [logo, setLogo] = useState()
    const [loading, setLoading] = useState(false)
    const [notiQuantity, setNotiQuantity] = useState(0)
    const authToken = localStorage.getItem('authToken')
    const [notifications, setNotifications] = useState([])

    const getNotifications = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/notification/get-all-admin-notification')
            if (response.data.status) {
                const unreadNotifications = response.data.result.data.filter(item => !item.markAsRead)
                setNotiQuantity(unreadNotifications.length)
                setNotifications(response.data.result.data)
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
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }, [])

    const getLogo = useCallback(async () => {
        try {
            const response = await api.get('/super-admin/get-logo')
            if (response.data.status) {
                setLogo(response.data.result.data)
                return
            }
        }
        catch (error) {
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
    }, [])

    useEffect(() => {
        if (authToken) {
            getLogo()
            getNotifications()
            return
        }
    }, [authToken, getLogo, getNotifications])

    return (
        <AppContext.Provider value={{
            logo,
            loading,
            getLogo,
            notiQuantity,
            notifications,
            getNotifications
        }}>
            {children}
        </AppContext.Provider >
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}