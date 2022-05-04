import React from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';

import Search from './weather/Search';
import Post from './weather/Posts';



function App() {
  const [ searchParams ] = useSearchParams()
  return (
  
    <Routes>
      <Route
        path="/search"
        element={<Search query={searchParams.get("q")} />}
      />
      <Route path="/post" element={<Post />} />
      <Route path="/" element={<Navigate to="/search" />} />
    </Routes>
    
  );
}

export default App;