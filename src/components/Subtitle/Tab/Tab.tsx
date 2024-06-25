import React from 'react'
import './tab.css'

interface Props {
  text: string;
  onSelect?: () => void;
}

const Button = ({text, onSelect}: Props) => {
  return (
    <li onClick={onSelect}>{text}</li>
  )
}

export default Button