import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
  theme={{
      token: {
        colorPrimary:'#3F9D13',
        algorithm: true, // 启用算法
      },
  }}
>
  <React.StrictMode>
    <App />
  </React.StrictMode>
 </ConfigProvider>
)
