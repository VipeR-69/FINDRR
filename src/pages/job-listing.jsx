import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners'


const JobListing = () => {

  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {fn: fnJobs, data: jobs, loading: loadingJobs} = useFetch(getJobs, { location, company_id, searchQuery, })
  const {fn: fnCompanies, data: companies} = useFetch(getCompanies);

  useEffect(() => {
    if(isLoaded)
      fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if(isLoaded)
      fnCompanies();
  }, [isLoaded]);


  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if(query)
      setSearchQuery(query);
  }

  const clearFilters = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("");
  }


  if(!isLoaded)
    return <BarLoader className='mt-7' width={"100%"} color='#0080FE' />

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-7xl text-center mt-10 pb-10'>Latest Jobs</h1>

      <form onSubmit={handleSearch} className='h-13 flex w-full gap-5 mb-4 items-center'>
        <Input
          type="text"
          placeholder="Search Jobs by title..."
          name="search-query"
          className='h-full flex-1 text-md px-5'
        />
        <Button type="submit" className='h-full sm:w-28' variant="blue">
          Search
        </Button>
      </form>


      <div className='flex flex-col sm:flex-row gap-5'>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className='cursor-pointer h-full flex-1'>
            <SelectValue placeholder="Filter by Location"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem> 
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className='cursor-pointer h-full flex-1'>
            <SelectValue placeholder="Filter by Company"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.isArray(companies) && companies.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem> 
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant='red' className='cursor-pointer h-full sm:w-1/8'>
            Clear Filters
        </Button>

      </div>


      {loadingJobs && (
        <BarLoader className='mt-7' width={"100%"} color='#0080FE' />
      )}

      {loadingJobs === false && (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12'>
          {jobs.length ?(
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
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