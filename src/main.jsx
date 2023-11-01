import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './templates/Layout/Layout.jsx'
import Home from './templates/Home/Home.jsx'
import Login from './templates/Login/Login.jsx'
import Registration from './templates/Registration/Registration.jsx'
import Dashboard from './templates/Dashboard/Dashboard.jsx'
import AuthProvider from './templates/AuthProvider/AuthProvider.jsx'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './templates/PrivateRoute/PrivateRoute.jsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Layout/>,
    children: [
      {
        path: 'home',
        element:<Home/>
      },
      {
        path: 'login',
        element:<Login/>
      },
      {
        path: 'registration',
        element:<Registration/>
      },
      {
        path: 'dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer/>
      </AuthProvider>
  </React.StrictMode>,
)
