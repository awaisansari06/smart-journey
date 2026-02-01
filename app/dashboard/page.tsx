"use client"

import React from 'react'
import DashboardHero from './_components/DashboardHero'
import QuickActions from './_components/QuickActions'
import UserTrips from './_components/UserTrips'

function Dashboard() {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-black p-6 md:p-10 lg:px-24'>
            {/* Hero Section */}
            <DashboardHero />

            {/* Quick Actions */}
            <QuickActions />

            {/* User Trips List */}
            <UserTrips />
        </div>
    )
}

export default Dashboard