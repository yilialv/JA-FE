import { useState } from 'react';
import './components.less';

const SwitchButton = (props) => {

  const [switchValue, setSwitchValue] = useState(true);

  const handleButtonClick = () => {
    let flag = !switchValue;
    setSwitchValue(flag);
    props.updateState(flag);
  };

  return (
    <div className="switch-background">
      <div className="switch" onClick={handleButtonClick}>
        <div className={`${switchValue ? "switch-active" : "switch-inactive"}`}>
          {props.option1}
        </div>
        <div className={`${!switchValue ? "switch-active" : "switch-inactive"}`}>
          {props.option2}
        </div>
      </div>
    </div>
  );
};

export default SwitchButton;