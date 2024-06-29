import React from 'react'
import './text-field.css'
import './text-field-container.css'
import './__label/text-field__label.css'
import './__input/text-field__input.css'
import './__label/label-container.css'

interface Props {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  example?: string;
  className?: string;
}

const TextField = ({
                       id,
                       value,
                       onValueChange,
                       placeholder,
                       example,
                       className}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div className={className}>
      <div className='label-container'>
        <label
            className="text-field__label"
            htmlFor={id}
        >
            {placeholder}
        </label>
      </div>
      <div className="text-field-container">
        <input
            className="text-field__input"
            type="text"
            placeholder={example}
            value={value}
            onChange={handleChange}/>
      </div>
    </div>
  )
}

export default TextField