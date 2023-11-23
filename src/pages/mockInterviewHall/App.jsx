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
import { getCardList } from "../../router";
import CommpanyList from '../../components/companyList';
import { useNavigate } from 'react-router-dom';

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
    getCardList(options).then(res => {
      setCardList(res);
      console.log(res);
    });
  }, [options]);

  const navigate = useNavigate();

  const navigateToMockInterview = (item) => {
    const { id, company, direction, round } = item;
    const req = {
      id: id,
      company: company,
      direction: direction,
      round: round
    };
    navigate('/mockInterviewConfig', { state: req });
  };

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
          <CommpanyList
            className='select'
            onChange={(value) => {
              setOptions(options => ({
                ...options,
                direction: value
              }));
            }}
          />
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
          cardList.map((item) => {
            return (
              <RecordCard key={item?.id} data={item} onClick={() => { navigateToMockInterview(item); }} />
            );
          })
        }
      </div>
    </div>
  );
});

export default MockInterviewHall;