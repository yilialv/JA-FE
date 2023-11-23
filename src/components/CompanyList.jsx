import { Select } from 'antd';
import { useEffect } from 'react';
import { fetchCompanyList } from '../router';
import './components.less';
import store from '../store';

const CompanyList = (props) => {

  useEffect(() => {
    fetchCompanyList();
  }, []);


  return (
    <div className={`${'select-background'} ${props.className}`}>
      <Select
        defaultValue=''
        onChange={props.onChange}
        style={{ width: '100%' }}
        options={
          store.companyList
            .map(item => {
              const { Name } = item;
              if (Name === '默认Logo') {
                return {
                  label: '不限',
                  value: ''
                };
              } else {
                return {
                  label: item?.Name,
                  value: item?.Name,
                };
              }
            })
        }
      />
    </div>
  );
};

export default CompanyList;