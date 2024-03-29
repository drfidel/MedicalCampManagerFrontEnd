import React from 'react'
import Login from './authViews/Login'
import NavigationBar from './header/NavigationBar'

const App = () => {
  return (
    <div>
      <div>
        <NavigationBar/>
        <Login/>
      </div>
    </div>
  )
}

export default App