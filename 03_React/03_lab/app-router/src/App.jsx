import { RouterProvider, createBrowserRouter } from 'react-router'
import './App.css'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage';
import Profile from './components/Profile';
import Settings from './components/Settings';
import About from './components/About';
import Login from './components/Login';
import { getAuth } from './auth';

const protectedLoader = () => {
  if ( !getAuth() ) {
    throw new Response('No autorizado', {
      status: 401,
      statusText: 'Inicie sesión para ver la página'
    });
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/profile',
    element: <Profile />,
    loader: protectedLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'settings',
        element: <Settings />,
        errorElement: <ErrorPage />
      },
    ],
  },
]);

function App() {


  return <RouterProvider router={router} />
}

export default App
