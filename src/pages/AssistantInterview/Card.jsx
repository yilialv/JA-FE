import { HeartOutlined, LoginOutlined, WarningOutlined, LikeOutlined } from "@ant-design/icons"
import heart_img from "../../imgs/icon_heart.png"
import person_img from "../../imgs/person.svg"


const style = {
  轻松: {
    bg: "bg-yellow-500",
    text: '轻松'
  },
  严肃: {
    bg: "bg-[#EA486A]",
    text: "严肃"
  },
  标准: {
    text: '标准',
    bg: "bg-[#5493FE]"
  },
  0: {
    bg: "bg-yellow-500",
    text: '轻松'
  },
}


export const ShareCard = (props) => {

  const item = props.dataSource


  return (
    <div className='w-[400px]  mx-1' onClick={props.onClick}>
      <div className='bg-white p-2 rounded-lg h-full card-item group'>
        <div className='flex items-center justify-between py-2'>
          <div className='flex items-center '>
            <img src={item.logo} className="w-[55px] h-[55px] rounded-[50%] mr-2" alt="" />
            <div>
              <p className='font-bold text-[18px]'>{item.company} <span className="inline-block w-[6px] h-[6px] ml-1 mr-2 rounded-3xl bg-[#5844CE]"></span>{item.round}</p>
              <p className='text-neutral-600 '>{item.direction}</p>
            </div>
          </div>
          <div className='text-neutral-600' style={{display:props.children ? 'none' : 'block'}}>
            <span className='text-[#333] group-hover:text-white group-hover:block relative top-[-10px]'><LoginOutlined /> 进入模拟面试</span>
          </div>
          <div style={{display:props.children ? 'block' : 'none'}}>
            {props.children}
          </div>
        </div>
        <div className='mt-3 mb-2 flex justify-between'><p><span className='font-bold text-md'>面试风格</span> <span className={`${style[(item.style || '轻松')].bg} rounded-lg text-white px-2 pt-[1px] pb-[2px]  text-[10px]`} >{style[(item.style || '轻松')].text}</span></p><p className="text-neutral-600">{new Date(item.interview_date * 1000).toLocaleDateString().replaceAll("/", '-')}</p></div>
        <p className='text-neutral-600 line-clamp-3 h-[60px]'>{item.brief}</p>
        <div className='flex justify-between mt-4 items-center' >
          <p className="flex items-center">
            <img className="w-[30px] rounded-3xl mr-1" src={item.avatar} alt="" />
            <span className='text-[#333] '>
              {item.nick_name}
            </span>
          </p>
          <p className="flex">
            <span className='text-[#333] ml-2 flex'><img className="w-[15px] relative left-[-3px] top-[-2px]" src={person_img} alt="" /> {item.popularity_rating}</span>
            <span className='text-[#333] ml-2'>
              {item.is_favorite ? <img  onClick={() => { props.like && props.like(item) }} src={heart_img} style={{ display: "inline", width: "16px", position: "relative", top: "-1px" }} /> : <HeartOutlined onClick={() => { props.like && props.like(item) }} />}
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
    <div onClick={props.onClick} className={`mr-4 bg-white py-3 px-2 mx-1 w-[420px] h-[80] rounded-lg shadow-md ${props.shadowColor}`} >
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

