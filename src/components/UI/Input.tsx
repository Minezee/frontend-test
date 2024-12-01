import React from 'react'

interface InputParams {
  value?: string;
  type?: string;
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
}

const Input = ({
  value = "",
  type = "text",
  placeholder = "",
  label = "Email",
  onChange,
}: InputParams) => {
  return (
    <label className='flex flex-col gap-1 mt-3 text-base w-full'>
      {label}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400'
      />
    </label>
  )
}

export default Input