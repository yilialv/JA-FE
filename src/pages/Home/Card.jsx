import { HeartOutlined, LoginOutlined, WarningOutlined, LikeOutlined } from "@ant-design/icons"
import heart_img from "../../imgs/icon_heart.png"







const style = {
  轻松:{
    bg:"bg-yellow-500",
    text:'轻松'
  },
  严肃:{
    bg:"bg-[#EA486A]",
    text:"严肃"
  },
  标准:{
    text:'标准',
    bg:"bg-[#5493FE]"
  }
}


export const ShareCard = (props) => {

  const item = props.dataSource


  return (
    <div className='px-2 w-[400px] mx-2'>
      <div className='bg-white p-2 rounded-lg h-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center '>
            <img src={item.logo} className="w-[55px] h-[55px] rounded-[50%] mr-2" alt="" />
            <div>
              <p className='font-bold text-[18px]'>{item.company}</p>
              <p className='text-neutral-600 '>{item.direction}</p>
            </div>
          </div>
          <div className='text-neutral-600'>
            {new Date(item.interview_date * 1000).toLocaleDateString().replaceAll("/",'-')}
          </div>
        </div>
        <p className='mt-3 mb-2'><span className='font-bold text-md'>面试风格</span> <span className={`${style[item.style].bg} rounded-lg text-white px-2 pt-[1px] pb-[2px]  text-[10px]`} >{style[item.style].text}</span></p>
        <p className='text-neutral-600 line-clamp-3 h-[60px]'>{item.brief}</p>
        <div className='flex justify-between mt-4'>
          <p>
            <span className='text-[#333] '><LoginOutlined  /> 进入模拟面试</span>
          </p>
          <p>
            <span className='text-[#333] ml-2'><LikeOutlined /> {item.popularity_rating}</span>
            <span className='text-[#333] ml-2'>
              { item.is_favorite ?  <img src={heart_img} style={{display:"inline", width:"16px", position:"relative", top:"-1px"}}/>: <HeartOutlined onClick={() => {props.like && props.like(item)}}/>  }
              &nbsp;{item.favorites}
              </span>
            <span className='text-[#333] ml-2'><WarningOutlined /> </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export const CommentCard = (props) => {
  const item = props.dataSource
  return (
    <div className={`mr-4 bg-white py-3 px-2 mx-1 w-[420px] h-[80] rounded-lg shadow-md ${props.shadowColor}`} >
      <div className='w-full mb-1 flex items-center bg-wh'>
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
  )

}

