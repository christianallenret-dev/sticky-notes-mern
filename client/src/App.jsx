
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Notes from './components/Notes'
import UpdateNote from './components/UpdateNote'


function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Notes/>
    },
    {
      path: "/update/notes/:id",
      element: <UpdateNote/>
    }
  ])

  return (
    <>
    <RouterProvider router={route}/>
    </>
  )
}

export default App
