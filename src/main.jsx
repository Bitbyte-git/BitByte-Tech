import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n'
import { getInitialLanguage, loadLanguage } from './i18n'
import './index.css'
import './polish.css'

loadLanguage(getInitialLanguage()).finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
