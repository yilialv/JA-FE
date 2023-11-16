import './App.less';
import { Layout } from 'antd';
import NavigationMenu from './components/NavigationMenu';
import router from "@/router/index"
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { getHomeData } from './router';

const App = observer(() => {
  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <Layout>
      <NavigationMenu />
      <div className=' '>
        {router()}
      </div>
    </Layout>
  );
});

export default App;
