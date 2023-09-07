import './App.less';
import { Layout } from 'antd';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home/App';
import Interview from './pages/Interview/App';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { getHomeData } from './router';

const App = observer(() => {
  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <Router>
      <Layout>
        <NavigationMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* {
            store.isLogin ? 
            <Route path="/interview" element={<Interview />} /> : 
            <Route path="/interview" element={<Navigate to="/" />}/>
          } */}
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </Layout>
    </Router>
  );
});

export default App;
