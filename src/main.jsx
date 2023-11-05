import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#3F9D13',
        algorithm: true, // 启用算法
        boxShadowSecondary: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
        boxShadowTertiary: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
      },
      components: {
        Menu: {
          iconSize: 20
        }
      }
    }}
  >
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </ConfigProvider>
)
