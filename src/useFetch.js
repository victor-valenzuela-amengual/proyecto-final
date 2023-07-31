import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {    
    const fetchData = async () => {
      try {           
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, [url]);
  
  return {data,loading,error};
};
export default useFetch;
