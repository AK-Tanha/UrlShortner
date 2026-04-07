import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'


function App() {
  const router = createBrowserRouter(
    {
      element: <AppLayout/>,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/',
          element: <LandingPage />
        }

      ]
    }
  );


  return (
    <div className='text-4xl text-amber-400 font-bold border-2 border-black-500'>
      Bismillah

      <Button variant="default" size="sm">
        Click me
      </Button>

    </div>

  )
}

export default App
