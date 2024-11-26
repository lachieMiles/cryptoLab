//defines routing and app structure @shareef just fix the createBrowserRouter and RouterProvider, last time it was on the app.tsx as well and showing errors
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; //added Navigate see below why.
import './index.css';

import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
//import ErrorPage from './pages/ErrorPage.tsx'; // still building
import Login from './pages/Login.tsx';
//import Saved from './pages/Saved.tsx'; // still building

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Default route
        element: <Navigate to="/login" replace />, // I added Navigate so that the user is redirected to the login page if they try to access the root URL
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/saved',
         //element: <Saved />, // Placeholder for saved page
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
