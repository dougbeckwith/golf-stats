import React from 'react'

const ShotList = ({children}) => {
  return (
    <div
      style={{display: 'flex', padding: '10px', gap: '20px', flexWrap: 'wrap'}}>
      {children}
    </div>
  )
}

export default ShotList
