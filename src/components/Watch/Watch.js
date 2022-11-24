import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Watch.css';

export class Watch extends Component {
  static propTypes = {
    zone: PropTypes.number,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    zone: 0,
  }

  state = {
    time: moment().utcOffset(this.props.zone),
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  shouldComponentUpdate = () => {
    if (moment().second() === this.state.time.second()) return false;
    return true;
  }

  handleClose = () => this.props.onClose(this.props.name);

  tick = () => {
    this.setState({ time: moment().utcOffset(this.props.zone) });
  }

  minuteRotation(time) {
    const minutes = time.minute();
    const seconds = time.second();
    return `rotate(${(minutes + seconds / 60) / 60}turn) translate(0, -80%) scaleY(2)`;
  }

  hourRotation(time) {
    const hours = time.hour();
    const minutes = time.minute();
    return `rotate(${(hours + minutes / 60) % 12 / 12}turn) translate(0, -48%) scaleY(1.2)`;
  }

  render() {
    const minStyle = { transform: this.minuteRotation(this.state.time) };
    const hourStyle = { transform: this.hourRotation(this.state.time) };
    return (
      <div className='watch'>
        <div className='watch-name'>{this.props.name}</div>
        <div className='watch-time'>{this.state.time.format('HH:mm:ss')}</div>
        <div className='watch-minute'><span style={minStyle}>↑</span></div>
        <div className='watch-hour'><span style={hourStyle}>↑</span></div>
        { this.props.onClose &&
          <div className='watch-close' onClick={this.handleClose}>{'X'}</div>
        }
       </div>
    )
  }
}

export default Watch
