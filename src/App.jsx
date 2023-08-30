import './App.less';
import { Layout } from 'antd';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home/App';
import Interview from './pages/Interview/App';
import FooterInfo from './components/FooterInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import store from './store';

const App = () => {
  useEffect(() => {
    store.getJwtToken();
  }, []);

  return (
    <Router>
      <Layout>
        <NavigationMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
        <FooterInfo />
      </Layout>
    </Router>
  );
};

export default App;
