import React from 'react'

function DashboardHero() {
    return (
        <div className='mb-8'>
            <h1 className='font-bold text-3xl text-gray-900 dark:text-white'>Welcome back 👋</h1>
            <p className='text-gray-500 mt-2'>Here's a snapshot of your travel plans and recent activity.</p>

            {/* Ambient background glow */}
            <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-linear-to-tr from-purple-100 to-orange-100 dark:from-purple-900/20 dark:to-orange-900/20 blur-[100px] -z-10 rounded-full opacity-60'></div>
        </div>
    )
}

export default DashboardHero
