import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-lg'>Page Not Found</p>
      <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>  Go Back Home</button>
    </div>
  )
}

export default NotFoundPage
