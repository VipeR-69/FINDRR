import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { BarLoader } from 'react-spinners'


const SavedJob = () => {

  const { isLoaded } = useUser();

  const { loading: loadingSavedJobs, data: savedJobs, fn: fnSavedJobs } = useFetch(getSavedJobs);

  useEffect(() => {
      if(isLoaded)
        fnSavedJobs();
    }, [isLoaded])
  
  if(!isLoaded || loadingSavedJobs)
    return <BarLoader className='mt-7' width={"100%"} color='#0080FE' />
  
  
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12'>
          {savedJobs.length ?(
            savedJobs.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found 😞</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SavedJob