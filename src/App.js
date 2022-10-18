
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Components/Layout/Main';
import LoginBoot from './Components/LoginBoot';
import RegisterReactBootstrap from './Components/RegisterReactBootstrap';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [   
      {
        path: '/',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/register',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/login',
        element: <LoginBoot></LoginBoot>
      },
      ]
  }
])
function App() {
  
  return (
    <div className="">
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
