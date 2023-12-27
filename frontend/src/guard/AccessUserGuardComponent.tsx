import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../service/authService';

const AccessUserGuardComponent = ({children}: { children: ReactNode }) => {
    return (
        isAdmin() ? children : <Navigate to={"/"}/>
    )
}

export default AccessUserGuardComponent
