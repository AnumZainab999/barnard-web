import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Admin from './Admin/Admin.js';


const route = createBrowserRouter([
  {
    path: '/',
    element:  <Admin />
      
  },
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
