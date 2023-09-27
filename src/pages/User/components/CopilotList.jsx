import { useEffect, useState } from "react";
import { Table, Badge, message } from "antd";
import moment from 'moment';
import { getCopilotList} from "../router";


const CopilotList = () => {
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
    await getCopilotList(params).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setDataSource(res.data.data.record_list);
      }
    }).catch((err) => {
      console.log('err:', err);
      message.error('获取辅助面试列表失败');
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
      dataIndex: 'round',
      key: 'round',
    },{
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
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
      dataIndex: '',
      key: 'x',
      render: () => <a onClick={setIsShowDetail(true)}>编辑</a>,
    },
  ];
  return (
    // <>
    //   <Table dataSource={dataSource} columns={columns} />
    //   {
    //     isShowDetail &&
        <InterviewDetail />
    //   }
    // </>
  );
  
};
export default CopilotList;