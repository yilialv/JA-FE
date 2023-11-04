import { Divider, message, Select } from "antd";
import RecordCard from "../../components/RecordCard";
import "./App.less";
import iconBuilding from '../../imgs/icon-building.svg';
import iconRound from '../../imgs/icon-round.svg';
import iconDirection from '../../imgs/icon-direction.svg';
import iconOrder from '../../imgs/icon-order.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
import store from "../../store";
import { observer } from 'mobx-react';
import { fetchCompanyList } from "../../router";

const sort_type = [
  {
    value: 1,
    label: '热度',
  },
  {
    value: 0,
    label: '最新',
  }
];

const direction = [
  {
    value: '',
    label: '不限'
  },
  {
    value: '前端开发',
    label: '前端开发'
  },
  {
    value: '后端开发',
    label: '后端开发'
  }
];

const round = [
  {
    value: '',
    label: '不限'
  },
  {
    value: '一面',
    label: '一面'
  },
  {
    value: '二面',
    label: '二面'
  },
];

const MockInterviewHall = observer(() => {

  useEffect(()=> {
    fetchCompanyList();
  },[]);

  const [options, setOptions] = useState({
    company: '',
    direction: '',
    round: '',
    sort_type: 0,
    limit: 11,
    page: 1
  });

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    getCardList();
  }, [options]);

  function getCardList() {
    axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, options).then((res) => {
      const { status, data: { data: { mock_interview_cards } }
      } = res;
      if (status === 200) {
        setCardList(mock_interview_cards);
      }
    }).catch((err) => {
      console.log('error:', err);
      message.error('获取卡片列表失败');
    });
  }

  return (
    <div className="mock-interview-hall">
      <div className="hall-header">
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconOrder} />
            排序
          </div>
          <Select
            className="select"
            defaultValue={1}
            options={sort_type}
            onChange={(value) => {
              setOptions(options => ({
                ...options,
                sort_type: value
              }));
            }} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconBuilding} />
            公司
          </div>
          <Select
            className="select"
            defaultValue=''
            options={ store.companyList.map(item => {
              return {
                label: item?.Name,
                value: item?.Name,
              }
            }) }
            onChange={(value) => {
              setOptions(options => ({
                ...options,
                company: value
              }));
            }} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconDirection} />
            方向
          </div>
          <Select
            className="select"
            defaultValue=''
            options={direction}
            onChange={(value) => {
              setOptions(options => ({
                ...options,
                direction: value
              }));
            }} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconRound} />
            轮次
          </div>
          <Select
            className="select"
            defaultValue={''}
            options={round}
            onChange={(value) => {
              setOptions(options => ({
                ...options,
                round: value
              }));
            }} />
        </div>
      </div>
      <Divider></Divider>
      <div className="hall-body">
        {
          cardList.map((item, index) => {
            return (
              <>
                <RecordCard key={index} data={item} />
              </>
            );
          })
        }
      </div>
    </div>
  );
});

export default MockInterviewHall;