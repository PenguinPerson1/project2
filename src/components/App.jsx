// import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from './NavBar'

function App() {

  return (
    <>
      <NavBar />
      <h1>It's a project</h1>
      <Outlet />
    </>
  )
}

export default App
