import {useState} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.0.100:4500/api/v1/';

interface IAxiosParams {
  url: string;
  method: string;
  body?: any | null;
  headers?: any;
}
const useAxios = ({
  url,
  method,
  body = null,
  headers = {'Content-Type': 'application/json'},
}: IAxiosParams) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const resetError = () => setError('');
  const fetchData = () => {
    setLoading(true);
    axios({
      method,
      url,
      data: body,
      headers,
    })
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {response, error, loading, resetError, fetchData};
};
export default useAxios;
