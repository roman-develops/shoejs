import React from 'react'
import './subtitle.css'

interface Props {
  text: string;
  className: string;
}

const Subtitle = ({text, className}: Props) => {
  return (
    <h2 className={`subtitle ${className}`}>{text}</h2>
  )
}

export default Subtitle