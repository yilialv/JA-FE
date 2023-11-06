import { HeartOutlined, LoginOutlined, WarningOutlined, LikeOutlined } from "@ant-design/icons";
export const ShareCard = (props) => {
  const item = props.dataSource;
  return (
    <div className='px-2'>
      <div className='bg-white p-2 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center '>
            <img src={item.avatar} className="w-[70px] h-[70px] rounded-[50%] mr-2" alt="" />
            <div>
              <p className='font-bold text-[18px]'>{item.company}</p>
              <p className='text-neutral-600'>{item.direction}</p>
            </div>
          </div>
          <div className='text-neutral-600'>
            {'2023.5.7'}
          </div>
        </div>
        <p className='mt-4 mb-2'><span className='font-bold text-md mr-1'>面试风格</span> <span className="bg-yellow-500 rounded text-white px-1 text-[10px]">人际关系</span></p>
        <p className='text-neutral-600'>昨天上午参加了腾讯面试二面，是专业面试，考官很nice，所以应该不用那么紧张。。。</p>
        <div className='flex justify-between mt-4'>
          <p>
            <span className='text-[#333] '><LoginOutlined /> 进入模拟面试</span>
          </p>
          <p>
            <span className='text-[#333] ml-2'><LikeOutlined /> 123</span>
            <span className='text-[#333] ml-2'><HeartOutlined /> 788</span>
            <span className='text-[#333] ml-2'><WarningOutlined /> </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const CommentCard = (props) => {
  const item = props.dataSource;
  return (
    <div className={`mr-4 bg-white py-3 px-2 w-[420px] h-[80] rounded-lg shadow-sm ${props.shadowColor}`} >
      <div className='w-full mb-1 flex items-center'>
        <img src={item.avatar} className='w-[70px] h-[70px] rounded-[50%] mr-2' alt="" />
        <div>
          <p className="w-full mb-1 flex items-center justify-between">
            <span className='font-bold'>{item.nickName}</span>
            <span className='text-[#333]'>{item.time}</span>

          </p>
          <p className='text-[#333] line-clamp-3 whitespace-break-spaces '>
            {item.desc}
          </p>
        </div>


      </div>


    </div>
  );

};

