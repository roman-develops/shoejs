import React from 'react'
import './title.css'

interface Props {
  text: string;
}

const Button = ({text}: Props) => {
  return (
    <h1 className='title'>{text}</h1>
  )
}

export default Button