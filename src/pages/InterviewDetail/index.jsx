import "./index.less"
import { Select, Space } from 'antd';
import { useParams } from 'react-router-dom';
import cm_img_7 from "../../imgs/cm-7.jpeg"
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";

function InterviewDetail() {
  const { id } = useParams();
  useEffect(() => {
    axios.post(`${BASE_URL}/api/copilot/get_detail`, {record_id:Number(id),type:[1]}).then((res) => {
     
    }).catch((err) => {
     
    });
  }, [])
  const handleChange = () => {

  }
  return (
    <div className="interview-detail-page">

      <div className="interview-content">
        <header className="relative">

          <div className="flex justify-between items-center">
            <div className="flex text-[18px]">
              <svg width="22" height="22" fill="none">
                <path d="M15.8526 2.5561L6.76165 11.3306C6.48478 11.6063 6.46849 12.0432 6.71279 12.3378L6.76165 12.3913L15.8522 21.4417C15.8897 21.479 15.9404 21.5 15.9933 21.5H17.5567C17.6671 21.5 17.7567 21.4105 17.7567 21.3C17.7567 21.2468 17.7355 21.1958 17.6978 21.1583L8.38992 11.8908L17.6882 2.84334C17.7673 2.76631 17.7691 2.63969 17.692 2.56052C17.6544 2.52183 17.6027 2.5 17.5487 2.5H15.9915C15.9397 2.5 15.8899 2.52011 15.8526 2.5561Z" fill="black" />
              </svg>
              <span className="relative top-[-1px] ml-2">返回</span>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div className="flex items-center">
              <img className="w-16 h-16 rounded-full mr-4" src={cm_img_7} alt="" />
              <div>
                <p style={{ fontWeight: 700, fontSize: 32 }}>字节跳动.二面</p>
                <p style={{ fontSize: 20 }} className="mt-2">产品设计岗</p>
              </div>
            </div>
          
            <div className="flex items-end" style={{ fontSize: 20 }}>
              该岗位平均面试分数 <b style={{ fontSize: 96 }} className="font-bolder relative top-5">97</b> <span className="text-xl">/ 100</span>
            </div>
          </div>
          <div className="more-content">
            <div className="flex">
              <p className="flex-1"><span style={{fontSize:14, fontWeight:700}}>面试时长：</span><span>00:32:25</span></p>
              <p className="flex-1"><span style={{fontSize:14, fontWeight:700}}>回答题数：</span><span>25题</span></p>
            </div>
            <div>
              <p style={{fontSize:14, fontWeight:700}} className="my-2">
                面试评价
              </p>
              <div>
                本次面试表现良好，在专业问题回答中有比较好的反应能力以及知识储备，语言表达能力强，性格比较外向，主动沟通能力良好。有三年专业工作背景，专业技能测试情况良好。
              但由于紧张，有些问题的回答不太完整，可以注意调整心态，好好准备下一场面试。
              </div>
            </div>
          </div>
          <div className="flex items-end absolute bottom-[50px] left-0 right-0 mx-auto justify-center">
            <svg className="relative top-[1px] mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM8.33492 9.26841L12.307 12.8983L16.1651 9.37243C16.2466 9.29791 16.3731 9.3036 16.4476 9.38514C16.4813 9.422 16.5 9.47013 16.5 9.52006V11.0082C16.5 11.0643 16.4764 11.1179 16.4349 11.1558L12.8399 14.441L12.7742 14.4947C12.6608 14.577 12.5301 14.6236 12.3971 14.6347L12.3171 14.6371L12.3073 14.6368C12.1411 14.6429 11.9729 14.5939 11.8324 14.4893L11.774 14.441L8.06509 11.0518C8.02362 11.0139 8 10.9603 8 10.9042V9.41605C8 9.30559 8.08954 9.21605 8.2 9.21605C8.24993 9.21605 8.29806 9.23472 8.33492 9.26841Z" fill="#666666" />
            </svg>
            点击查看本次面试评论
          </div>
        </header>
        <div className="relative p-[15px]">
          <Select
            defaultValue="lucy"
            className="absolute top-[-50px] left-5"
            style={{ width: 220, height: 50 }}
            onChange={handleChange}
            size="large"
            options={[
              { value: '所哟', label: '所有问题' },
              { value: 'lucy', label: '面试官问题' },
              { value: 'Yiminghe', label: '语音识别问题' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <ul className="p-[15px]">
            <li className="bg-[#E8E8F7] rounded-md p-[15px]">
              <div className="flex items-center mb-2">
                <img className="w-8 h-8 rounded-full mr-4" src={cm_img_7} alt="" />
                <span style={{ fontSize: '14px', color: '#A3A3A3', fontWeight: 700 }}>2023.10.5 13:30:20</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: 20 }}>Mysqlsxxxxx</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InterviewDetail