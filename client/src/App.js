import React from 'react';
import './App.css';
import Jobs from './Jobs'

const JOBS_API_URL = 'http://localhost:5000/jobs';
const mockJobs = [
  {title: 'SWE', company: 'Google'}
]; 

async function fetchJobs(apiUrl, updateCallback) {
  const res = await fetch(apiUrl);
  const jobs =   await res.json();
  updateCallback(jobs);
}

function App() {

  // Declate a new 'jobList' variable and set it to empty array []
  // Funtion 'updateJobs' will update the state on the jobs
  // We can pass an argument that is the new value of our state
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(JOBS_API_URL, updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
