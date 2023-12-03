import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './components.less';

const CheckBox = (props) => {

  const [checkValue, setCheckValue] = useState(true);

  const handleButtonClick = () => {
    let flag = !checkValue;
    setCheckValue(flag);
    props.updateState(flag);
  };

  return (
    <div className="checkbox-field" onClick={handleButtonClick}>
      <div className='checkbox-first option'>
        {props.option1}<div className='box'><div></div></div>
      </div>
      <div className='checkbox-second option'>
        {props.option2}<div className='box'><div></div></div>
      </div>
      <div className={`${'check'} ${checkValue ? "checkbox-first" : "checkbox-second"}`}>
        <CheckOutlined />
      </div>
    </div>
  );
};

export default CheckBox;