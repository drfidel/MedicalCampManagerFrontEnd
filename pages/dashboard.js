import React from 'react'
import CampDashboard from '../src/components/dashboard/CampDashboard'
import Footer from '../src/components/footer/Footer'
import NavigationBar from '../src/components/header/NavigationBar'

const dashboard = () => {
  return (
    <>
      <NavigationBar />
      <CampDashboard/>
      <Footer/>
    </>
  )
}

export default dashboard