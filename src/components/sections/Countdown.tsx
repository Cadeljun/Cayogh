
'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Target date: November 1, 2026
    const targetDate = new Date('2026-11-01T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <div className="h-32" />; // Placeholder to prevent layout shift

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-6 mt-12 animate-in fade-in zoom-in duration-700">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl w-16 h-20 md:w-24 md:h-28 flex items-center justify-center mb-2 backdrop-blur-md shadow-2xl">
            <span className="text-2xl md:text-4xl font-extrabold text-primary font-headline">
              {unit.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
