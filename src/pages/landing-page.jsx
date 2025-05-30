import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-15 py-8 sm:py-15'>
        <section className='text-center'>
            <h1 className='flex flex-col items-center justify-center gradient-title font-extrabold sm:text-4xl lg:text-6xl tracking-tight py-4'>
                Land A Job At
                <span>Your Dream Company</span>
            </h1>
            <p className='text-zinc-300 sm:mt-5 text-xs sm:text-xl'>
                Explore Thousands of job lisitng or find the perfect candidate
            </p>
        </section>

        <div className='flex gap-7 justify-center'>
            <Link to="/jobs">
                <Button variant="blue" size="xl">Find Jobs</Button>
            </Link>
            <Link to="/post-job">
                <Button variant="red" size="xl">Post Jobs</Button>
            </Link>
        </div>
    </main>
  )
}

export default LandingPage