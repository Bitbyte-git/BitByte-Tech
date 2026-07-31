import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './showcase/index.css'
import './index.css'
import './polish.css'
import { bootNonCriticalAssets } from './performance.js'

bootNonCriticalAssets()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
