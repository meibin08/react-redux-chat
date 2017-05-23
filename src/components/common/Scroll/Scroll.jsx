import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import IScroll from 'iscroll/build/iscroll-probe.js';
import Event from 'src/utils/events';

class Scroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myScroll: null
    }
  }

  componentDidMount() {
    setTimeout( () => {
      this.state.myScroll = new IScroll(this.refs.scrollWrapper, { 
        mouseWheel: true,
        probeType: 3,
        bounce: false,
        preventDefault: false,
        disablePointer: false,
        scrollbars: this.props.scrollbar,
      });

      this.stopTouchmove = (e) => { 
        e.preventDefault();
      };
      this.state.myScroll.on('scroll', () => {
        this.props.onScroll && this.props.onScroll(this.state.myScroll.y);
      });

      let allowScroll = this.props.allowScroll;
      if(!allowScroll){
        Event.on(this.refs.scrollWrapper, 'touchmove', this.stopTouchmove); 
        Event.on(document, 'touchmove', this.stopTouchmove); 
      };
      
    }, 250);

  }

  manualTouchMove(allowScroll){     
      if(allowScroll){

          Event.off(document, 'touchmove', this.stopTouchmove);                             
      }else{
          Event.on(document, 'touchmove', this.stopTouchmove); 
      }
  }

  componentDidUpdate() {
    setTimeout(() => {
        this.state.myScroll.refresh();
    }, 350);
  }

  componentWillReceiveProps(nextProps) {
    this.manualTouchMove(nextProps.allowScroll);
    if(nextProps.refresh) {
      setTimeout(() => {
          this.state.myScroll && this.state.myScroll.refresh();
      }, 150);
    }
    const { ScrollToY } = nextProps;

    if(!ScrollToY || this.updateY == nextProps.updateY) {
      return;
    }

    this.updateY = nextProps.updateY;

    this.state.myScroll.scrollTo(0, -ScrollToY, 500)
  }

  componentWillUnmount() {
    Event.off(this.refs.scrollWrapper, 'touchmove', this.stopTouchmove); 
    Event.off(document, 'touchmove', this.stopTouchmove);
  }

  render() {    
    const props = this.props;
    const { children, className, ...others } = props;
    return (
      <div className="scroll-wrapper" ref="scrollWrapper">
        <div className="scroller">
          { children }
        </div>
      </div>
    )
  }
}

export default Scroll
