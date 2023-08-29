import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const SlideInOnMount = ({ children }) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  });

  return (
    <CSSTransition in={inProp} timeout={500} classNames="slide">
      {children}
    </CSSTransition>
  );
};

export default SlideInOnMount;
