import isEqual from 'lodash/isEqual';
import range from 'lodash/range';
import { Component } from 'react';

import { IIntervalTimebase } from '@/types';
import { customSetInterval, customClearInterval } from '@/utils';


const indicatorsRange = range(12);

interface Props {
  hourHandDelay: number;
  minuteHandDelay: number;
  initialSecond: number;
}

interface State {
  currentSecond: number;
}

export default class AnalogClock extends Component<Props, State> {
  private intervalTimebase?: IIntervalTimebase;

  constructor(props: Props) {
    super(props);
    this.state = { currentSecond: props.initialSecond };
    this.startTicking = this.startTicking.bind(this);
  }

  startTicking() {
    this.setState({ currentSecond: this.props.initialSecond });

    this.intervalTimebase = customSetInterval(() => {
      this.setState((prevState) => ({ currentSecond: prevState.currentSecond + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      customClearInterval(this.intervalTimebase);
      this.startTicking();
    } else if (this.state.currentSecond === 60) this.setState({ currentSecond: 0 });
  }

  componentDidMount() {
    this.startTicking();
  }

  componentWillUnmount() {
    customClearInterval(this.intervalTimebase);
  }

  render() {
    return (
      <div className='AnalogClock'>
        <div className='AnalogClock-hour' style={{
          animationDelay: '' + -this.props.hourHandDelay + 's',
        }}/>
        <div className='AnalogClock-minute' style={{
          animationDelay: '' + -this.props.minuteHandDelay + 's',
        }}/>
        <div className='AnalogClock-second' style={{
          transform: 'rotateZ(' + this.state.currentSecond * 6 + 'deg)',
        }}/>
        <div className='AnalogClock-axis' />
        {indicatorsRange.map(i => (
          <span key={i} className='AnalogClock-indicator' />
        ))}
      </div>
    );
  }
}
