import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../Utils/localStorage'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    // localStorage.clear()

    setLocalStorage()
    const [userData, setUserData] = useState(null)
    const [ updateState,setUpdateState] = useState(false);
     useEffect(() => {
        const {employees, admin} = getLocalStorage()
        // console.log(employees);
        setUserData(employees)
    }, [])

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData,setUpdateState]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
