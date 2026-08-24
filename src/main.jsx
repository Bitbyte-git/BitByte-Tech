import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './polish.css'

const bootPerformance = () => {
  import('./performance.js').then(({ bootNonCriticalAssets }) => {
    bootNonCriticalAssets()
  })
}

if (document.readyState === 'complete') {
  window.setTimeout(bootPerformance, 0)
} else {
  window.addEventListener('load', bootPerformance, { once: true })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
