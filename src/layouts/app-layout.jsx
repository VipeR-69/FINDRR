import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen m-13'>
            <Header />
            <Outlet />
        </main>
        <div className='p-10 mt-10 text-center bg-zinc-800'>
            Findrr: A Job Portal
        </div>
    </div>
  )
}

export default AppLayout