import "./index.less"
import CustomInput from "../../components/Input/Input";
import { Button, Modal, Form, Select, Radio, Input, message, DatePicker } from "antd";
import cm_img_7 from "../../imgs/cm-7.jpeg"
import store from '../../store';
const { TextArea } = Input;
function InterviewDetail() {
  const handleChange = () => {

  }
  return (
    <div className="interview-detail-edit">

      <div className="interview-content">
        <header className="relative bg-[#D9D9F2;]">

          <div className="flex text-[18px] items-center">
            <svg width="22" height="22" fill="none">
              <path d="M15.8526 2.5561L6.76165 11.3306C6.48478 11.6063 6.46849 12.0432 6.71279 12.3378L6.76165 12.3913L15.8522 21.4417C15.8897 21.479 15.9404 21.5 15.9933 21.5H17.5567C17.6671 21.5 17.7567 21.4105 17.7567 21.3C17.7567 21.2468 17.7355 21.1958 17.6978 21.1583L8.38992 11.8908L17.6882 2.84334C17.7673 2.76631 17.7691 2.63969 17.692 2.56052C17.6544 2.52183 17.6027 2.5 17.5487 2.5H15.9915C15.9397 2.5 15.8899 2.52011 15.8526 2.5561Z" fill="black" />
            </svg>
            <span className="relative top-[-1px] ml-2 mr-2">返回</span>
            <img className="w-8 h-8 rounded-full mr-4" src={cm_img_7} alt="" />
            <p className='font-bold text-[18px] mr-4'>百度公司 <span className="inline-block w-[6px] h-[6px] ml-1 mr-2 rounded-3xl bg-black relative top-[-2px]"></span>二面</p>
            <p>
              <span className="font-bold">岗位方向：</span>
              <span>产品设计岗</span>
            </p>
          </div>

        </header>
        <div className="flex justify-between p-[15px]">
          <div className="w-1/3 border-r border-red">
            <p className="font-bold text-[16px] my-3">公司</p>
            <CustomInput className="w-[90%]" dataList={store.getFormatCompanyList()} value={''} callback={(value) => {

            }} />
            <p className="font-bold text-[16px] my-3">岗位方向</p>
            <Select
              showSearch
              placeholder='请选择您的岗位方向'
              rules={[{ required: true }]}
              size="large"
              className="w-[90%]"
              options={[
                {
                  value: "前端开发",
                  label: "前端开发",
                },
                {
                  value: "后端开发",
                  label: "后端开发",
                },
                {
                  value: "产品经理",
                  label: "产品经理",
                },
                {
                  value: "测试开发",
                  label: "测试开发",
                },
                {
                  value: "UI",
                  label: "UI",
                },
              ]}
            />
            <p className="font-bold text-[16px] my-3">轮数</p>
            <Select
              size="large"
              showSearch
              placeholder="请选择面试轮数"
              optionFilterProp="children"
              className="w-[90%]"
              options={[
                {
                  value: '一面',
                  label: '一面',
                },
                {
                  value: '二面',
                  label: '二面',
                },
                {
                  value: '三面',
                  label: '三面',
                },
                {
                  value: '四面',
                  label: '四面',
                },
                {
                  value: '五面',
                  label: '五面',
                },
                {
                  value: 'HR',
                  label: 'HR',
                },
              ]}
            />
            <p className="font-bold text-[16px] my-3">面试日期</p>
            <DatePicker className="w-[90%]" format="YYYY-MM-DD" />
            <p className="font-bold text-[16px] my-3">分享内容</p>
            <TextArea className="w-[90%]" rows={3} />
            <p className="font-bold text-[16px] my-3">预设面试风格</p>
            <Radio.Group value={'small'} size='large'>
              <Radio.Button value="small">轻松</Radio.Button>
              <Radio.Button value="middle">中等</Radio.Button>
              <Radio.Button value="large">严格</Radio.Button>
            </Radio.Group>
          </div>
          <div className="w-2/3">
            <div className="border-b w-[90%] mx-auto py-2 flex items-start">
              <span className="font-bold mr-4" style={{ fontSize: 16 }}>问题1</span>
              <TextArea className="w-[90%] border-none" rows={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewDetail