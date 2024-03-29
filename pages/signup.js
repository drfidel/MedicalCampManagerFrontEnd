import React from 'react'
import Signup from '../src/components/authViews/Signup'
import Login from '../src/components/authViews/Login'
import Footer from '../src/components/footer/Footer'
import NavigationBar from '../src/components/header/NavigationBar'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children }

    </div>
  )
  
}


const auth = () => {
  return (
    
    <div>
      <SafeHydrate>
        <NavigationBar/>
        <Signup/>
        <Footer/>
      </SafeHydrate>
    </div>
  )
}

export default auth