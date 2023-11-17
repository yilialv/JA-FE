
import ProTypes from 'prop-types';
import { PropTypes, observer } from "mobx-react";
import { useRef, useState } from 'react';
import "./input.less";
import { BoxPlotFilled } from '@ant-design/icons';


const Input = (props) => {

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
    box.current.style.display = 'none';
    props.callback && props.callback(value);
   
  };
  return (
    <div className='input-box' onMouseEnter={() => {selectModel.current.style.display = 'flex';}} onMouseLeave={() => {selectModel.current.style.display = 'none';}}>
      <input  value={inputValue}/>
      <div ref={selectModel}>
        <div className='company-box' ref={BoxPlotFilled}>
          {
            props.dataList.map((item,itemIndex) => {
              return (
                <div key={itemIndex}>
                  <p className='hidden' id={item.key}></p>
                  <ul>
                    {
                      item.children.map((c,ci) => {
                        return (
                          <li key={ci} onClick={() => {setValue(c);}}>
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