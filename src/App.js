import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Admin from './Admin/Admin.js';


const route = createBrowserRouter([
  {
    path: '/',
    element:  <Admin />,
    errorElement: <div>Page Not Found</div>
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
