import React from 'react'
import ReactDOM from 'react-dom/client'
import WritingPage from './WritingPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WritingPage kind="posts" />
  </React.StrictMode>,
)
