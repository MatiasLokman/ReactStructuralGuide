import React, { useState, useEffect } from 'react';
import { getCurrentDateTime } from '../../utils/Utils';
import './Clock.css';

const Clock = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Actualizar la fecha y hora cada segundo
      setDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-container">
      <b className="p-clock">{dateTime.time}</b>
      <b className="p-clock">{dateTime.date}</b>
    </div>
  );
}

export default Clock;
