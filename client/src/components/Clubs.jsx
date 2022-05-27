import React from 'react'
import {v4 as uuidv4} from 'uuid'

const Clubs = ({clubData}) => {
  return clubData.map((item) => {
    const id = uuidv4()
    return (
      <div key={id}>
        <div>{item.club}</div>
      </div>
    )
  })
}

export default Clubs
