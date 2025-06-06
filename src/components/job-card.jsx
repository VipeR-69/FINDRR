import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { deleteJob, saveJob } from '@/api/apiJobs';
import { BarLoader } from 'react-spinners'

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {}
}) => {

    const [saved, setSaved] = useState(savedInit);
    const { user } = useUser();
    const {fn: fnSavedJob, data: savedJob, loading: loadingSavedJob} = useFetch(saveJob, {alreadySaved: saved,});
    

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id
        })
        onJobSaved();
    }

    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, { job_id: job.id })

    const handleDeleteJob = async () => {
        await fnDeleteJob()
        onJobSaved()
    }

    useEffect(() => {
        if(savedJob !== undefined)
            setSaved(savedJob?.length > 0);
    },[savedJob]);

    return (
    <Card className="flex flex-col">
        {loadingDeleteJob && (
            <BarLoader className='mb-5' width={"100%"} color='#0080FE' />
        )}
        <CardHeader>
            <CardTitle className='flex justify-between font-bold text-2xl'>
                {job.title}
                {!isMyJob && (
                    <Trash2Icon onClick={handleDeleteJob} size={23} fill='red' className='text-red-300 cursor-pointer' />
                )}
            </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-4 flex-1'>
            <div className='flex justify-between'>
                {job.company && <img src={job.company.logo_url} className='h-6' />}
                <div className='flex items-center gap-2 text-base'>
                    <MapPinIcon size={20} /> {job.location}
                </div>
            </div>
            <hr />
            {job.description}
        </CardContent>

        <CardFooter className='flex gap-4'>
            <Link to={`/job/${job.id}`} className='flex-1'>
                <Button variant="secondary" className='w-full cursor-pointer'>
                    More Details
                </Button>
            </Link>

            {!isMyJob && (
                <Button variant="outline" className='w-13 cursor-pointer' onClick={handleSaveJob} disabled={loadingSavedJob}>
                    {saved ? (
                        <Heart size={28} stroke='red' fill='red' />
                    ) : (
                        <Heart size={28} />
                    )}
                </Button>
            )}

        </CardFooter>

    </Card>
  )
}

export default JobCard