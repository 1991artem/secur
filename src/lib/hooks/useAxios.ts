/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4500/api/v1/';

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
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {response, error, loading, resetError, fetchData};
};
export default useAxios;
