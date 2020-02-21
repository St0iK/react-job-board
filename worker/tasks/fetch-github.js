const fetch = require('node-fetch');
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    
    const allJobs = [];
    let resultCount = 1, onPage = 1;
    
    while(resultCount > 0) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        resultCount = jobs.length;
        console.log(resultCount);
        allJobs.push(...jobs);
        onPage++;
    }
    console.log('Done')

    const juniorJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        
        if (jobTitle.includes('Junior') || jobTitle.includes('Apprentice')) {
            return false;
        }

        return true;
    });
    

    const success = await setAsync('github', JSON.stringify(allJobs));
    console.log(success);
}


module.exports = fetchGithub;
module.exports();