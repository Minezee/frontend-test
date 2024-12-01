import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface CheckboxParams {
  active: boolean;
  onChange: (active: boolean) => void;
  label: string;
}

const Checkbox = ({
  active = false,
  onChange,
  label = "Checkbox"
}: CheckboxParams) => {
  return (
    <label htmlFor="" className='flex gap-2 items-center mt-5 text-sm'>
    <input type="checkbox" className='hidden' checked={active} onChange={() => onChange(!active)}/>
    <div onClick={() => onChange(!active)} className='cursor-pointer w-[16px] h-[16px] border-2 rounded-sm border-primary peer-checked:after:translate-x-full rounded-xs flex items-center justify-center'>
      {active && <FaCheck className='text-primary text-[8px]' />}
    </div>
    {label}
  </label>
  )
}

export default Checkbox