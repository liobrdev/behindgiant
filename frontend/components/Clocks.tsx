import { Component } from 'react';

import { AnalogClock, DigitalClock } from '@/components';
import { request } from '@/utils';


const defaultClientUtcOffset = - new Date().getTimezoneOffset() * 60;
const defaultPstUtcOffset = 32400;

const getSecondsElapsedToday = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((now.getTime() - startOfDay.getTime()) / 1000);
};

const validatePSTOffset = (offset: any): number => {
  if (typeof offset === 'number' && offset > -86400 && offset < 86400) return offset;
  throw new Error('Failed validatePSTOffset:', offset);
};

interface State {
  timezoneOffset?: number;
  hourHandDelay: number;
  minuteHandDelay: number;
  initialHour: number;
  initialMinute: number;
  initialSecond: number;
}

export default class Clocks extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      timezoneOffset: undefined,
      hourHandDelay: 0,
      minuteHandDelay: 0,
      initialHour: 0,
      initialMinute: 0,
      initialSecond: 0,
    };

    this.handleFetchPSTOffset = this.handleFetchPSTOffset.bind(this);
    this.setClocks = this.setClocks.bind(this);
  }

  async handleFetchPSTOffset() {
    this.setState({
      timezoneOffset: (
        await request
          .get('/pst_offset')
          .then(res => validatePSTOffset(res.body))
          .catch(err => {
            console.error(err);
            return defaultPstUtcOffset - defaultClientUtcOffset;
          })
      ),
    });
  }

  setClocks() {
    if (typeof this.state.timezoneOffset === 'undefined') this.handleFetchPSTOffset();
    else {
      let totalSecondsElapsed = getSecondsElapsedToday() + this.state.timezoneOffset;
  
      if (totalSecondsElapsed < 0) totalSecondsElapsed += 86400;
      else if (totalSecondsElapsed > 86400) totalSecondsElapsed -= 86400;

      this.setState({
        hourHandDelay: totalSecondsElapsed % 43200,
        minuteHandDelay: totalSecondsElapsed % 3600,
        initialHour: Math.floor(totalSecondsElapsed / 3600), 
        initialMinute: Math.floor((totalSecondsElapsed % 3600) / 60), 
        initialSecond: totalSecondsElapsed % 60,
      });
    }
  }

  componentDidUpdate({}, prevState: State) {
    if (prevState.timezoneOffset !== this.state.timezoneOffset) this.setClocks();
  }

  componentDidMount() {
    this.setClocks();
  }

  render() {
    return (
      <>
        <div className='Clocks'>
          <AnalogClock
            hourHandDelay={this.state.hourHandDelay}
            minuteHandDelay={this.state.minuteHandDelay}
            initialSecond={this.state.initialSecond}
          />
          <DigitalClock
            initialHour={this.state.initialHour}
            initialMinute={this.state.initialMinute}
            initialSecond={this.state.initialSecond}
          />
        </div>
      </>
    );
  }
}
