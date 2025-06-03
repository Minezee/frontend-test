import React from 'react'
import { Check } from 'lucide-react';

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
      <input type="checkbox" className='hidden' checked={active} onChange={() => onChange(!active)} />
      <div onClick={() => onChange(!active)} className='cursor-pointer w-[16px] h-[16px] border-2 rounded-sm border-primary peer-checked:after:translate-x-full rounded-xs flex items-center justify-center'>
        {active && <Check className="text-primary text-xs" />}
      </div>
      {label}
    </label>
  )
}

export default Checkbox