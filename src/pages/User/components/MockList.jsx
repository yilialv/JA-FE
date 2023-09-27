import { useEffect, useState } from "react";
import { Table, Badge } from "antd";
import moment from 'moment';
import { getMockList } from "../router";


const MockList = () => {
  useEffect(()=> {
    getListData();
  },[]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [company,setCompany] = useState('');
  const [round, setRound] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const  getListData = async () => {
    const params = {
      page: page,
      limit: limit,
      company: company,
      round: round
    };
    await getMockList(params).then((data) => {
      setDataSource(data.data.record_list);
    });
  };

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
    <Table dataSource={dataSource} columns={columns} pagination/>
  );

};
export default MockList;