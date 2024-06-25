import React from 'react'
import './text-area.css'
import './text-area-container.css'
import './__textarea/text-area__textarea.css'
import './__label/text-area__label.css'
import './__label/label-container.css'

interface Props {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  example?: string;
  className?: string;
}

const TextField = ({id, value, onValueChange, placeholder, example, className}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div className={`text-area ${className}`}>
      <div className='label-container'>
        <label className="text-area__label" htmlFor={id}>{placeholder}</label>
      </div>
      <div className="text-area-container">
        <textarea className="text-area__textarea" id="link-prefix" name="link-prefix" placeholder={example} value={value} onChange={handleChange}/>
      </div>
    </div>
  )
}

export default TextField