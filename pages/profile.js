import React from 'react'
import UserProfile from '../src/components/authViews/UserProfile'
import Footer from '../src/components/footer/Footer'
import NavigationBar from '../src/components/header/NavigationBar'

const profile = () => {
  return (
      <>
      <NavigationBar/>
      <UserProfile/>
      <Footer/>
      </>
    
  )
}

export default profile