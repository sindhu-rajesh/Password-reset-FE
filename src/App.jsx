//import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpPage from './Components/SignUpPage'
import LogInPage from './Components/LogInPage'
import PasswordResetPage from './Components/PasswordResetPage'
import './App.css'
import ResetPage from './Components/ResetPage'
import NotFoundPage from './Components/NotFoundPage'

const App = () => {

  // Define the routing configuration  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<SignUpPage/>
    },
    {
      path: "/login",
      element:<LogInPage/>
    },
    {
      path: "/forgotpassword",
      element:<PasswordResetPage/>
    },
    {
      path: "/resetpage/:verificationString",
      element:<ResetPage/>
    },
    {
      path: "/404page",
      element:<NotFoundPage/>
    }
  ])
  return (
  // Render the RouterProvider with the configured router
    <RouterProvider router={router}/>
  )
}

export default App