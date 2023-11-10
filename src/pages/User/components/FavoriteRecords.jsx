import { useNavigate } from 'react-router-dom';
import { Content } from "antd/es/layout/layout";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import RecordCard from "../../../components/RecordCard";
import "./components.less";
import { useEffect, useState } from 'react';
import { getFavoriteList } from '../router';

const FavoriteRecords = () => {

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList(currentPage)
  }, []);

  const getList = (page) => {
    getFavoriteList({
      "limit": 10,
      "page": page
    }).then((res) => {
      const { experience_list, total } = res;
      setList(experience_list);
      setTotal(total);
    });
  };

  const changePage = (page, pageSize) => {
    setCurrentPage(page);
    getList(page);
  };

  const navigate = useNavigate();

  return (
    <Content className="records-container">
      {
        list.length ?
          <div className="records">
            {list.map((item) => { 
              return (
                <RecordCard key={item?.id} data={item}/>
              );
            })}
          </div>
          :
          <div className="empty">
            <InfoCircleOutlined />
            <div>暂无数据</div>
            <div>快去模拟面试大厅看看吧</div>
            <Button type="primary"
              onClick={()=>navigate('/mockInterviewHall')}
            >模拟面试大厅 &#10132;</Button>
          </div>
      }
      <Pagination 
        current={currentPage} 
        total={total}
        onChange={changePage}
      />
    </Content>
  );
};
export default FavoriteRecords;