import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners'

const Onboarding = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: {role},
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.log("Error updating role : ", err);
      });
  }

  useEffect(() => {
    if(user?.unsafeMetadata?.role){
      navigate(user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs")
    }
  }, [user])

  if(!isLoaded)
    return <BarLoader className='mt-7' width={"100%"} color='#0080FE' />


  return (
    <div className='flex flex-col items-center justify-center mt-30'>
      <h2 className='gradient-title font-extrabold text-6xl sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-20 grid grid-cols-2 gap-15 w-full md:px-60'>
        <Button variant="blue" className="h-35 text-4xl font-bold" onClick={() => handleRoleSelection("candidate")}>Candidate</Button>
        <Button variant="red" className="h-35 text-4xl font-bold" onClick={() => handleRoleSelection("recruiter")}>Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding