import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class SlideInOnMount extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = React.createRef();
  }

  render() {
    return (
      <CSSTransition
        nodeRef={this.nodeRef}
        in={true}
        timeout={500}
        classNames="slide"
      >
        <div ref={this.nodeRef}>{this.props.children}</div>
      </CSSTransition>
    );
  }
}

export default SlideInOnMount;
