import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import AuthPage from './pages/auth'
import NotFoundPage from './pages/not-found'
import DashboardPage from './pages/dashboard'
import RedirectLinkPage from './pages/redirect-link'
import LinkPage from './pages/link'
import ProfilePage from './pages/profile'
import ProtectedRoute from './components/ProtectedRoute'
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
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/:id',
        element: <RedirectLinkPage />
      },
      {
        path: '/link/:id',
        element: (
          <ProtectedRoute>
            <LinkPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
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
