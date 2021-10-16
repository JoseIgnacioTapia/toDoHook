import { useState } from 'react';

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });

      if (!response.ok) {
        throw new Error('Request Failed!');
      }

      const data = response.json();
      applyData(data);
    } catch (error) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(true);
  };

  return { isLoading, error, sendRequest };
};

export default useHttp;
