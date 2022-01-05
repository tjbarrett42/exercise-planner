import axios from 'axios';

const KEY = '011f66b40dmsh5230e0f2b943426p1339c2jsn0ce69c0ef8bc';

export default axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
    params: {

    },
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': '011f66b40dmsh5230e0f2b943426p1339c2jsn0ce69c0ef8bc'
    }
});