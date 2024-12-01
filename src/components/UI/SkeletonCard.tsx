import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <div className="w-full aspect-square flex items-center justify-center bg-gray-300 animate-pulse p-5 rounded-xl group">
        </div>
        <div className="flex flex-col">
          <div className=" mt-2 lg:mt-4 mb-1 lg:mb-2 skeleton-load h-4"></div>
          <div className="mb-2 lg:mb-2 skeleton-load h-4 w-2/3"></div>
          <div className="mb-2 skeleton-load h-4 w-1/2"></div>
          <div className="mb-2 h-3 skeleton-load"></div>
          <div className='skeleton-load h-4 w-2/3'></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard