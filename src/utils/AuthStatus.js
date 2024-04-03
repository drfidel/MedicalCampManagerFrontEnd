import React from 'react'
import { useSelector } from 'react-redux'

const AuthStatus = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)

  if(isLoggedIn){

    return isLoggedIn
  
  } else {

    return null
  }
}

export default AuthStatus;