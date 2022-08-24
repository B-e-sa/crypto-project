import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
        </ Route>
      </ Routes>
    </ BrowserRouter>
  </React.StrictMode>
)
