import { getJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners'


const JobListing = () => {

  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {fn: fnJobs, data: jobs, loading: loadingJobs} = useFetch(getJobs, { location, company_id, searchQuery, })

  useEffect(() => {
    if(isLoaded)
      fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);


  if(!isLoaded)
    return <BarLoader className='mt-7' width={"100%"} color='#0080FE' />

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-7xl text-center mt-15 pb-6'>Latest Jobs</h1>

      {loadingJobs && (
        <BarLoader className='mt-7' width={"100%"} color='#0080FE' />
      )}

      {loadingJobs === false && (
        <div>
          {jobs.length ?(
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} />
            })
          ) : (
            <div>No Jobs Found 😞</div>
          )}
        </div>
      )}


    </div>

  )
}

export default JobListing