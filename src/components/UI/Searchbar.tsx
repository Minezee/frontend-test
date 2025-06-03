import { InputParams } from '@/types/input'
import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = ({
  value,
  onChange,
  placeholder
}: InputParams) => {
  return (
    <div className='py-2 px-4 text-sm border border-gray-500 text-gray-500 rounded-full flex items-center max-w-[300px]'>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type="text" className='bg-transparent focus:outline-none focus:border-none focus:ring-none text-gray-600 flex-1 w-full' />
      <button>
        <Search size={16} />
      </button>
    </div>
  )
}

export default Searchbar