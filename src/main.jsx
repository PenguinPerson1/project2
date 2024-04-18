import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'


import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './components/App.jsx'
import Home from './components/Home.jsx'
import EditNote from './components/EditNote.jsx'
import Category from './components/Category.jsx'
import Topic from './components/Topic.jsx'
import Add from './components/Add.jsx'
import TextBox from './components/TextBox.jsx'
import NoteGeneral from './components/NoteGeneral.jsx'
import CategoryGeneral from './components/CategoryGeneral.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "add",
        element: <Add />
      },
      {
        path: "c/",
        element: <CategoryGeneral />,
        children: [
          {
            path: ":category",
            element: <Category />,
            children: [
              {
                path: "t/:topic",
                element: <Topic />
              }
            ]
          },
        ]
      },
      {
        path: "n/",
        element: <NoteGeneral />,
        children: [
          {
            path: ":id",
            element: <EditNote />
          }
        ]
      }
    ]
  },
  {
    path: "/text",
    element: <TextBox />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
