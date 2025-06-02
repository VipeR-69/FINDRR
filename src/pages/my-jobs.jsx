import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react"
import { BarLoader } from 'react-spinners'

const MyJobs = () => {
  
  const { user, isLoaded } = useUser();

  if(!isLoaded)
    return <BarLoader className='mt-7' width={"100%"} color='#0080FE' />
  
  
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate" ? "My Applications" : "My Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  )
}

export default MyJobs