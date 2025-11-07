import { useState } from 'react'
import './styles/App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
