import React from 'react'
import {useParams} from 'react-router-dom'

const Club = () => {
  const params = useParams()
  console.log(params)
  return <div>Club Id = {params.id}</div>
}

export default Club
