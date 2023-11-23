import './components.less';

const ClickButton = (props) => {
  return (
    <div className="button-background" onClick={props.onClick}>
      <div className={`${props.reverse === true ? "button" : "button-reverse"}`}>
        {props.children}
      </div>
    </div>
  );
};

export default ClickButton;