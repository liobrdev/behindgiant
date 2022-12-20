import isEqual from 'lodash/isEqual';
import { Component } from 'react';

import { IIntervalTimebase } from '@/types';
import { customSetInterval, customClearInterval } from '@/utils';


const numberFormatOptions: Intl.NumberFormatOptions = {
  minimumIntegerDigits: 2,
  useGrouping: false,
};

interface Props {
  initialHour: number;
  initialMinute: number;
  initialSecond: number;
}

interface State {
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
}

export default class DigitalClock extends Component<Props, State> {
  private intervalTimebase?: IIntervalTimebase;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentHour: props.initialHour,
      currentMinute: props.initialMinute,
      currentSecond: props.initialSecond,
    };

    this.startTicking = this.startTicking.bind(this);
  }

  startTicking() {
    this.setState({
      currentHour: this.props.initialHour,
      currentMinute: this.props.initialMinute,
      currentSecond: this.props.initialSecond,
    });

    this.intervalTimebase = customSetInterval(() => {
      this.setState((prevState) => ({ currentSecond: prevState.currentSecond + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      customClearInterval(this.intervalTimebase);
      this.startTicking();
    } else if (this.state.currentSecond === 60) {
      this.setState((prevState) => ({
        currentSecond: 0,
        currentMinute: prevState.currentMinute + 1
      }));
    } else if (this.state.currentMinute === 60) {
      this.setState((prevState) => ({
        currentMinute: 0,
        currentHour: prevState.currentHour + 1
      }));
    } else if (this.state.currentHour === 24) this.setState({ currentHour: 0 });
  }

  componentDidMount() {
    this.startTicking();
  }

  componentWillUnmount() {
    customClearInterval(this.intervalTimebase);
  }

  render() {
    const hours = this.state.currentHour.toLocaleString('en-US', numberFormatOptions);
    const minutes = this.state.currentMinute.toLocaleString('en-US', numberFormatOptions);
    const seconds = this.state.currentSecond.toLocaleString('en-US', numberFormatOptions);

    let analogHour = this.state.currentHour;
    let isAfterNoon = false;

    if (analogHour >= 12) {
      isAfterNoon = true;
      analogHour -= 12;
    }

    if (analogHour === 0) analogHour = 12;

    return (
      <time className='DigitalClock' dateTime={`${hours}:${minutes}:${seconds}`}>
        {analogHour}:{minutes} {isAfterNoon ? 'PM' : 'AM'}
      </time>
    );
  }
}
