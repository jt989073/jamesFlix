import axios from 'axios'
import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMBDB = async (url) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer " + ENV_VARS.TMDB_API_KEY,
        },
      };
      
      let res = await axios.get(url, options)

      if(res.status !== 200){
        throw new Error('Failed to fetch data from TMDB' + res.statusText)
      }

      return res.data
}