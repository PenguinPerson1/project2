import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './components/App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import './index.css'
import Portfolio from './components/Portfolio.jsx'  
import PortfolioItem from './components/PortfolioItem.jsx'
import Bio from './components/Bio.jsx'

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
        path: "about",
        element: <About />,
        children: [
          {
            path: 'portfolio',
            element: <Portfolio />
          },
          {
            path: "portfolio/:id",
            element: <PortfolioItem />
          },
          {
            path: "bio",
            element: <Bio />
          }
        ]
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
