import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
  return (
    <>
        <nav className='flex justify-between items-center'>
            <Link>
                <img src='/findrr-logo.png' className='h-10 sm:h-20' />
            </Link>
            <Button variant="outline" className='cursor-pointer h-full w-15 sm:w-20 text-base'>Login</Button>
        </nav>
    </>
  )
}

export default Header