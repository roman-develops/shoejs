import React from 'react'
import './button.css'
import './_type/_primary/button_type_primary.css'
import './_type/_secondary/button_type_secondary.css'

interface Props {
  text: string;
  styleType?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

const Button = ({text, styleType = 'primary', onClick, className}: Props) => {
  let styleTypeClassName = new Map([
    ['primary', 'button_type_primary'],
    ['secondary', 'button_type_secondary']
  ]);
  
  return (
    <button type='submit' onClick={onClick} className={`button ${styleTypeClassName.get(styleType)} ${className}`}>{text}</button>
  )
}

export default Button