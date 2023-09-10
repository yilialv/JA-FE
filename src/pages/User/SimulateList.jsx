import { Table, Badge } from "antd";
import moment from 'moment';


const SimulateList = () => {
  const dataSource = [
    {
      key: '1',
      company: '阿里巴巴',
      direction: '后端',
      category: ' 2',
      interview_time: '1694334990',
      minutes: '40',
      status: '1',
    },{
      key: '2',
      company: '阿里巴巴',
      direction: '后端',
      category: ' 2',
      interview_time: '1694323490',
      minutes: '40',
      status: '1',
    },{
      key: '3',
      company: '阿里巴巴',
      direction: '后端',
      category: ' 2',
      interview_time: '1694314890',
      minutes: '40',
      status: '1',
    },{
      key: '4',
      company: '阿里巴巴',
      direction: '后端',
      category: ' 2',
      interview_time: '1683734990',
      minutes: '40',
      status: '1',
    },{
      key: '5',
      company: '阿里巴巴',
      direction: '后端',
      category: ' 2',
      interview_time: '1694376390',
      minutes: '40',
      status: '1',
    },
  ];
  
  const columns = [
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },{
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
    },{
      title: '轮数',
      dataIndex: 'category',
      key: 'category',
    },{
      title: '开始时间',
      dataIndex: 'interview_time',
      key: 'interview_time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.interview_time - b.interview_time,
      render: (timestamp) => 
        moment(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss'),
    },{
      title: '耗时（分钟）',
      dataIndex: 'minutes',
      key: 'minutes',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => <Badge status="success" text="已完成" />,
    },{
      title: '操作',
      dataIndex: 'settings',
      key: 'settings',
      render: () => <a>编辑</a>,
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
  
};
export default SimulateList;