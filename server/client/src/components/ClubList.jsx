import React from 'react'

const List = ({children}) => {
  return (
    <div>
      <div className='container h-full mx-auto flex justify-between items-center'>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default List
