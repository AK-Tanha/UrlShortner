import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import AuthPage from './pages/auth'
import NotFoundPage from './pages/not-found'
import DashboardPage from './pages/dashboard'
import RedirectLinkPage from './pages/redirect-link'
import LinkPage from './pages/link'
import { RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([

  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/not-found',
        element: <NotFoundPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/:id',
        element: <RedirectLinkPage />
      },
      {
        path: '/link/:id',
        element: <LinkPage />
      }

    ]
  }
]
);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
