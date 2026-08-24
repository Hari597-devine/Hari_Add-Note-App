// This is the starting point of the React app

import { StrictMode } from 'react'        // StrictMode helps find bugs during development
import { createRoot } from 'react-dom/client' // createRoot lets React control a part of the HTML page
import './index.css'                        // Import global styles (colors, fonts, layout)
import App from './App.jsx'                 // Import the main App component

// Find the div with id="root" in index.html and render our App inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
