import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Admin from './Admin/Admin.js';
import Receptionist from './Receptionist/Receptionist.js';
import Dashboard from './Dashboard/Dashboard.js';


const route = createBrowserRouter([
  {
    path: '/',
    element:  <Dashboard />,
    errorElement: <div>Page Not Found</div>
  },
  {
    path: '/admin',
    element:  <Admin />,
    errorElement: <div>Page Not Found</div>
  },
  {
    path: '/receptionist',
    element:  <Receptionist />,
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
