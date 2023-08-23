import React from 'react'
import { Navigate } from 'react-router-dom';
import { isUser } from '../service/authService';

const AuthGuardComponent = ({children}) => {
  return (
    isUser() ? <Navigate to={"/"}/> : children
  )
}

export default AuthGuardComponent
