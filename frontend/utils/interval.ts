import { IIntervalTimebase } from '@/types';


export function customSetInterval(func: () => void, time: number): IIntervalTimebase {
  let lastTime = Date.now();
  let lastDelay = time;
  let obj: IIntervalTimebase = {};
  
  function tick() {
    func();

    let now = Date.now();
    let delta = now - lastTime;

    if (delta > time || delta <= 0) delta = time;

    lastTime = now;
    lastDelay = time + lastDelay - delta;
    obj.timeoutId = setTimeout(tick, lastDelay);
  }

  obj.timeoutId = setTimeout(tick, time);
  return obj;
}

export function customClearInterval(intervalTimebase?: IIntervalTimebase) {
  if (typeof intervalTimebase?.timeoutId !== 'undefined') {
    clearTimeout(intervalTimebase.timeoutId);
  }
}
