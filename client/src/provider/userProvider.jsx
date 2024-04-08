import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from './authProvider'
import axiosInstance from '../axiosInstance'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const { token } = useAuth()
    const [userData, setUserData] = useState({})

    const updateUser = (newUserData) => {
        setUserData(newUserData)
    }
    useEffect(() => {
        async function fetchMyAPI() {
            if (token) {
                try {
                    const response = await axiosInstance.get('users')
                    console.log(response)
                    setUserData(response.data)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        fetchMyAPI()
    }, [token])

    return (
        <UserContext.Provider value={{ userData, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
