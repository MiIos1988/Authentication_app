import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { isUser } from '../service/authService';

const AuthGuardComponent = ({children}: { children: ReactNode }) => {
  return (
    isUser() ? <Navigate to={"/"}/> : children
  )
}

export default AuthGuardComponent
