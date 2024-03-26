import { useEffect, useState } from 'react';

function useCountdown() {
  const [timeRemain, setTimeRemain] = useState<number>(0);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    if (timeRemain && timeRemain > 0) {
      const timer = setInterval(() => {
        setTimeRemain((time) => (time -= 1000));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemain === 0) {
      setIsFinish(true);
    }
  }, [timeRemain]);

  const getPartialString = (timeElement: any) => {
    const [[name, value]] = Object.entries(timeElement);
    if (value === 1) name.slice(0, -1);
    return `${value} ${name}`;
  };

  const getDateString = (date: string) => {
    if (!timeRemain) {
      setTimeRemain(new Date(date).valueOf() - Date.now());
      return;
    }

    let time = timeRemain / 1000;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    while (time > 60 * 60 * 24) {
      days++;
      time -= 60 * 60 * 24;
    }

    while (time > 60 * 60) {
      hours++;
      time -= 60 * 60;
    }

    while (time > 60) {
      minutes++;
      time -= 60;
    }

    while (time > 1) {
      seconds++;
      time -= 1;
    }

    const stringArray = [{ days }, { hours }, { minutes }, { seconds }];
    while (Object.values(stringArray[0])[0] === 0 && stringArray.length > 1)
      stringArray.shift();
    return stringArray.map((t) => getPartialString(t)).join(' ');
  };

  return { timeRemain: (date: string) => getDateString(date), isFinish };
}

export default useCountdown;
