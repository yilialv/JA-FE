import { useEffect, useState } from "react";
import { Table, Badge, Select, message } from "antd";
import moment from 'moment';
import { getCopilotList} from "../router";
import { fetchCompanyList } from "../../../router";
import { useNavigate } from 'react-router-dom';
import { Content } from "antd/es/layout/layout";
import { DIRECTION_LIST, ROUND_LIST } from "../../../constant";


const CopilotList = () => {
  useEffect(()=> {
    getCompanyList();
  },[]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [company,setCompany] = useState('');
  const [round, setRound] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [companyList, setCompanyList] = useState([{value: '', label: ''}]);

  const navigate = useNavigate();
  
  useEffect(()=> {
    const params = {
      page: currentPage,
      limit: pageSize,
      company: company,
      round: round
    };
    getCopilotList(params).then((res) => {
      if (res.status === 200) {
        const list = res.data.data.record_list;
        list.forEach((item, index) => {
          item.key = index;
        });
        setDataSource(list);
        setTotal(res.data.data.total);
      }
    }).catch((err) => {
      console.log('err:', err);
      message.error('获取辅助面试列表失败');
    });
  },[currentPage, pageSize, company, round]);

  const getCompanyList = async () => {
    const list = fetchCompanyList();
    setCompanyList(list);
  };

  const navigateToDetail = (id) => {
    navigate(`/user/interviewDetail/${id}`);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(current);
    setPageSize(size);
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
        moment(Number(`${timestamp}000`)).format('YYYY-MM-DD HH:mm'),
    },{
    //   title: '耗时（分钟）',
    //   dataIndex: 'minutes',
    //   key: 'minutes',
    // },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => <Badge status="success" text="已完成" />,
    },{
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (_, { id }) => <a onClick={() => navigateToDetail(id)}>编辑</a>,
    },
  ];
  return (
    <Content>
      <div className="user-select-container">
        <div className="user-select">
          <div className="label">
            公司
          </div>
          <Select
            allowClear
            key='company'
            size="large"
            options={companyList}
            onChange={(e)=>setCompany(e)}/>
        </div>
        <div className="user-select">
          <div className="label">
            轮数
          </div>
          <Select 
            allowClear
            key='round'
            size="large"
            options={ROUND_LIST}
            onChange={(e)=>setRound(e)}/>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          onShowSizeChange: handlePageSizeChange,
          onChange: handlePageChange,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条数据`,
        }}
      />
    </Content>
  );
  
};
export default CopilotList;