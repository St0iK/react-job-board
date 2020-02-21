import React from 'react'
import Typography from '@material-ui/core/Typography';
import Job from './Job'
import MobileStepper from '@material-ui/core/MobileStepper';
import { Button,Dialog } from '@material-ui/core';
import JobModal from './JobModal';

export default function Jobs({jobs}) {

    // Modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // Pagination
    const [activeStep, setActiveStep] = React.useState(0);

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    const numJobs = jobs.length;
    const steps = Math.ceil(numJobs / 50);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);


    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose}></JobModal>
            <Typography variant="h4" component="h1">
                Sofrware Jobs
            </Typography>
            <Typography variant="h6">
                Found {numJobs} Jobs | Page {activeStep + 1} of {steps}
            </Typography>

            {
                jobsOnPage.map((job,i) => <Job key={i} job={job} onClick={() => {
                    selectJob(job);
                    handleClickOpen();
                }} />)
            }
            

            <MobileStepper
                steps={steps}
                variant="progress"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === steps}>
                        Next
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />



        </div>

        
    )
}