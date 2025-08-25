import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../Utils/localStorage'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    // localStorage.clear()

    setLocalStorage()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const {employees, admin} = getLocalStorage()
        setUserData(employees)
    }, [])

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
