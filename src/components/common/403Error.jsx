import React from 'react'

const Error403 = ({errorstatus, statusText, message}) => {
  return (
    <div>
      {!errorstatus ? 
        <h2>
          database Server unreachable
        </h2> : 
        <div>
          <h1>{errorstatus} - {statusText}</h1>
          <h3>Token Expired, Please Logout and relogin</h3>
        </div>}

    </div>
  )
}

export default Error403