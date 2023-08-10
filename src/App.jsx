import { useState } from 'react';
import { MENU, page } from './constant';
import { Menu } from 'antd';
import './App.css';

const App = () => {
  const [current, setCurrent] = useState('interview');
  
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const renderPage = () => {
    return page[current];
  };

  return (
    <div className='app'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={MENU} />
      {renderPage()}
    </div>
  );
};

export default App;
