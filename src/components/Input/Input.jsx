
import ProTypes from 'prop-types';
import { PropTypes, observer } from "mobx-react";
import { useRef, useState } from 'react';
import "./input.less";
import { RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';


const Input = (props) => {  
  useEffect(() => {
    if(props.dataList[0]){
      setInputValue(props.value || props.dataList[0].children[0].Name)
    }
  },[props.dataList])
  const selectModel = useRef(null);
  const english = props.dataList.map(item => item.key);
  const [inputValue, setInputValue] = useState();
  const box = useRef(null);

  const toTarget = (letter) => {
    const targetDOM = document.getElementById(letter);

    box.current.scrollTo({
      behavior: "smooth",
      top: targetDOM.parentNode.offsetTop
    });
   
  };
  
  const setValue = (value) => {
    setInputValue(value.Name);
    selectModel.current.style.display = 'none';
    props.callback && props.callback(value);
   
  };
  const inputMouseEnter = () => {
    selectModel.current.style.display = 'flex'; 
    document.querySelector(".input-icon").style.transform = 'rotate(90deg)'
  }
  const inputMouseLeave = () => {
    selectModel.current.style.display = 'none';
    document.querySelector(".input-icon").style.transform = 'rotate(0deg)'
  }
  return (
    <div className='input-box' onMouseEnter={inputMouseEnter} onMouseLeave={inputMouseLeave}>
      <input  value={inputValue}/>
      <RightOutlined className='input-icon' style={{position:'absolute', top:'15px', right: '10px', transformOrigin:'center', transition:"all 200ms"}}/>
      <div ref={selectModel}>
        <div className='company-box' ref={box}>
          {
            props.dataList.map((item,itemIndex) => {
              return (
                <div key={itemIndex}>
                  <p className='hidden' id={item.key}></p>
                  <ul>
                    {
                      item.children.map((c,ci) => {
                        return (
                          <li key={ci} onClick={( ) => {setValue(c)}}>
                            {c.Name}
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              );
            })
          }
        </div>
        <ul className='indicator'>
          {
            english.map(item => {
              return (
                <li onClick={() => {toTarget(item);}} key={item} >{item}</li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
Input.propTypes = {
  dataList: ProTypes.array.isRequired,
  // indicator: PropTypes
};
Input.defaultProps = {
  indicator: true
};
export default Input;