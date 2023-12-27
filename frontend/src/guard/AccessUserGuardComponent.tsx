import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { isAdmin } from '../service/authService';

const AccessUserGuardComponent = ({children}) => {
    return (
        isAdmin() ? children : <Navigate to={"/"}/>
    )
}

export default AccessUserGuardComponent
