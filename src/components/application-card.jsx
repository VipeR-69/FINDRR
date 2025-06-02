import { BriefcaseBusiness, Cpu, Download, School } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from 'react-spinners'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const ApplicationCard = ({ application, isCandidate = false}) => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    }

    const { loading: loadingHiringStatus, fn: fnHiringStatus} = useFetch( updateApplicationStatus, { job_id: application.job_id}, )

    const handleStatusChange = (status) => {
        fnHiringStatus(status);
    }

    return (
        
        <Card>
            {loadingHiringStatus && <BarLoader width={"100%"} color='#0080FE' />}    
            <CardHeader>
                <CardTitle className="flex justify-between font-bold text-xl items-center">
                    { isCandidate ? `${application?.job?.title} at ${application?.job?.company?.name}` : application.name }
                    <Download 
                        size={20}
                        className="bg-white text-black rounded-full h-8 w-8 p-2 cursor-pointer"
                        onClick={handleDownload}
                    />
                </CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex gap-3 items-center">
                        <BriefcaseBusiness size={17} /> Experience :- {application?.experience} Years
                    </div>
                    <div className="flex gap-3 items-center">
                        <School size={17} /> Education :- {application?.education}
                    </div>
                    <div className="flex gap-3 items-center">
                        <Cpu size={17} /> Skills :- {application?.skills}
                    </div>
                </div>
                <hr />
            </CardContent>
            
            <CardFooter className='flex justify-between'>
                <span>Date :- {new Date(application?.created_at).toLocaleString()}</span>
                {isCandidate ? (
                    <span className="font-bold">
                        Status: {application?.status}
                    </span>
                ) : (
                    <Select onValueChange={handleStatusChange} defaultValue={application?.status}>
                        <SelectTrigger className='w-60'>
                            <SelectValue placeholder = "Application Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='cursor-pointer' value="Applied">Applied</SelectItem>
                            <SelectItem className='cursor-pointer' value="Interviewing">Interviewing</SelectItem>
                            <SelectItem className='cursor-pointer' value="Hired">Hired</SelectItem>
                            <SelectItem className='cursor-pointer' value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </CardFooter>
        </Card>
    )
} 

export default ApplicationCard