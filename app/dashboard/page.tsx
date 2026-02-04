"use client"

import React from 'react'
import DashboardHero from './_components/DashboardHero'
import QuickActions from './_components/QuickActions'
import UserTrips from './_components/UserTrips'
import SavedPlacesList from './_components/SavedPlacesList'

function Dashboard() {
    return (
        <div className='min-h-screen bg-linear-to-b from-purple-50/20 via-white to-white dark:bg-black p-6 md:p-10 lg:px-24 pb-20'>
            {/* Hero Section */}
            <section className="mb-10">
                <DashboardHero />
            </section>

            {/* Quick Actions */}
            <section className="mb-12">
                <QuickActions />
            </section>

            {/* User Trips List */}
            <section className="mb-12">
                <UserTrips />
            </section>

            {/* Saved Places List */}
            <section className="mb-12">
                <SavedPlacesList />
            </section>
        </div>
    )
}

export default Dashboard