import React from 'react';
import useFetch from '@/hooks/useFetch';

export const MyComponent = () => {
  const { isLoading, isSuccess, error, makeRequest } = useFetch();

	// this is just an illustration
	// it's either you use a useEffect
	// or you bind it to a function call
  React.useEffect(() => {
    makeRequest({ urlPath: '/api/data' })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Request succeeded!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
