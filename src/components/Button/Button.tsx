import React from 'react'
import './button.css'

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({text, onClick, className}: Props) => {
  return (
    <button type='submit' onClick={onClick} className={`button ${className}`}>{text}</button>
  )
}

export default Button