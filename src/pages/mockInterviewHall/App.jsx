import { Divider, Select } from "antd";
import RecordCard from "../../components/RecordCard";
import "./App.less";
import iconBuilding from '../../imgs/icon-building.svg';
import iconRound from '../../imgs/icon-round.svg';
import iconDirection from '../../imgs/icon-direction.svg';
import iconOrder from '../../imgs/icon-order.svg';

const order = [
  {
    value: 'trend',
    label: '热度'
  },
  {
    value: 'latest',
    label: '最新'
  }
];

const company = [
  {
    value: '字节跳动',
    label: '字节跳动'
  },
  {
    value: '百度',
    label: '百度'
  }
];

const direction = [
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
    value: 1,
    label: '一面'
  },
  {
    value: 2,
    label: '二面'
  },
];

const data = {
  company: '阿里巴巴',
  direction: '后端',
  category: 2,
  stared: true,
  starNumber: 25,
};

const mockInterviewHall = () => {
  return (
    <div>
      <div className="hall-header">
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconOrder} />
            排序
          </div>
          <Select className="select" defaultValue='trend' options={order} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconBuilding} />
            公司
          </div>
          <Select className="select" defaultValue='字节跳动' options={company} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconDirection} />
            方向
          </div>
          <Select className="select" defaultValue='后端开发' options={direction} />
        </div>
        <div className="hall-select">
          <div className="hall-label">
            <img src={iconRound} />
            轮次
          </div>
          <Select className="select" defaultValue={1} options={round} />
        </div>
      </div>
      <Divider></Divider>
      <div className="hall-body">
        <RecordCard data={data} />
        <RecordCard data={data} />
        <RecordCard data={data} />
        <RecordCard data={data} />
        <RecordCard data={data} />
      </div>
    </div>
  );
};

export default mockInterviewHall;