import React from 'react'

const Error404 = ({errorstatus, statusText, message}) => {
  return (
    <div>
      <h1>{errorstatus} : {statusText} </h1>
    </div>
  )
}

export default Error404