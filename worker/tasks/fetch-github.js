const fetch = require('node-fetch');
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient(process.env.REDIS_URL);

const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    
    const allJobs = [];
    let resultCount = 1, onPage = 1;
    
    while(resultCount > 0) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        resultCount = jobs.length;
        allJobs.push(...jobs);
        onPage++;
    }
    
    const seniorJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        return !(jobTitle.includes('Junior') || jobTitle.includes('Apprentice'));
    });

    const success = await setAsync('github', JSON.stringify(seniorJobs));
    console.log(success);
}

module.exports = fetchGithub;
module.exports();