import './App.less';
import { Layout } from 'antd';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home/App';
import Interview from './pages/Interview/App';
import User from './pages/User/App';
import MockInterviewHall from './pages/mockInterviewHall/App';
import MockInterview from './pages/mockInterview/App';
import MockInterviewDetail from './pages/mockInterview/MockInterviewDetail';
import RecordUpload from './pages/User/RecordUpload';
import InterviewDetail from './pages/User/components/InterviewDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <div className='web-body'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* {
            store.isLogin ? 
            <Route path="/interview" element={<Interview />} /> : 
            <Route path="/interview" element={<Navigate to="/" />}/>
          } */}
            <Route path='mockInterviewDetail' element={<MockInterviewDetail />} />
            <Route path="/mockInterviewHall" element={<MockInterviewHall />} />
            <Route path="/mockInterview" element={<MockInterview />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/user" element={<User />} />
            <Route path="/experience/upload" element={<RecordUpload />} />
            <Route path="/user/interviewDetail/:id" element={<InterviewDetail />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
});

export default App;
