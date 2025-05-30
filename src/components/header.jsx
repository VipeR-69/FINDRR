import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'

const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if(search.get("sign-in"))
      setShowSignIn(true);
  }, [search])

  const handleOutsideClick = (e) => {
    if(e.target == e.currentTarget){
      setShowSignIn(false);
      setSearch({});
    }
  }

  return (
    <>
        <nav className='flex justify-between items-center'>
            
            <Link>
                <img src='/findrr-logo.png' className='h-10 sm:h-20' />
            </Link>
            
            <div className='flex gap-7 items-center'>
              <SignedOut>
                <Button
                  variant="outline"
                  className='cursor-pointer h-full w-15 sm:w-20 text-base'
                  onClick={() => setShowSignIn(true)}>
                    Login
                  </Button>
              </SignedOut>
              <SignedIn>
                {user?.unsafeMetadata?.role === "recruiter" && (
                  <Link to="/post-job">
                  <Button variant="destructive" className='rounded-full cursor-pointer'>
                    <PenBox size={20} className='mr-1' />
                    Post a job
                  </Button>
                </Link> )}
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '50px',
                      height: '50px',
                    }
                  }
                }} >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Jobs"
                      labelIcon={<BriefcaseBusinessIcon size={15} />}
                      href="/my-jobs"
                    />
                    <UserButton.Link
                      label="Saved Jobs"
                      labelIcon={<Heart size={15} />}
                      href="/saved-jobs"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </div>

        </nav>

        {showSignIn && (
          <div className='fixed inset-0 flex items-center justify-center bg-black/50' onClick={handleOutsideClick}>
            <SignIn signUpForceRedirectUrl='/onboarding' fallbackRedirectUrl='/onboarding' />
          </div>
        )}
    </>
  )
}

export default Header