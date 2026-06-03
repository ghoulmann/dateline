import { useState, useEffect } from 'react';

let globalTick = 0;
let clockInterval = null;

function startGlobalClock() {
  if (clockInterval) return;
  clockInterval = setInterval(() => {
    globalTick += 1;
  }, 1000);
}

export function useClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    startGlobalClock();
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return tick;
}
