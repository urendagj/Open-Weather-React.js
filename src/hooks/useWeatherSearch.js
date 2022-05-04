import React, { useState, useEffect } from 'react';

function useWeatherSearch(query) {
  const [ forecasts, setForecasts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      let responseBody2 = {};
      setLoading(true);
      try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=16&appid=7e458eb017caef40bcc172bdfd5c3dfc&units=imperial
            `,
          { signal: controller.signal }
        );
        responseBody = await response.json();
     
        
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled")
        } else {
          setError(true);
          throw e;
        }
      }
      if (!ignore) {
        setLoading(false);
        setError(false);
        setForecasts(responseBody.list || []);
      }
    }
    if (query) {
      fetchSearchResults()
    }
    return () => {
      controller.abort();
      ignore = true;
    }
  }, [ query ]);

  return [ forecasts, loading, error ];
}

export default useWeatherSearch;