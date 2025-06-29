'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// BIZLEVEL: Заменяем lodash shuffle на нативную JS функцию
const shuffle = (array: any[]): any[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
import { ChevronUp, ChevronDown, ChevronRight, Minus } from 'lucide-react';

interface LeaderboardItem {
  id: number;
  name: string;
}

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

export default function LeaderboardBentoBox() {
  const initialLeaderboard: LeaderboardItem[] = [
    { id: 1, name: 'User one' },
    { id: 2, name: 'User two' },
    { id: 3, name: 'User three' },
    { id: 4, name: `you` },
    { id: 5, name: 'User four' },
  ];

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [trend, setTrend] = useState<{
    [key: number]: 'up' | 'down' | 'neutral';
  }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const newLeaderboard = shuffle(leaderboard);

      // Calculate trends
      const newTrend: { [key: number]: 'up' | 'down' | 'neutral' } = {};
      newLeaderboard.forEach((item, index) => {
        const oldIndex = leaderboard.findIndex((oldItem) => oldItem.id === item.id);
        if (oldIndex < index) newTrend[item.id] = 'down';
        else if (oldIndex > index) newTrend[item.id] = 'up';
        else newTrend[item.id] = 'neutral';
      });

      setTrend(newTrend);
      setLeaderboard(newLeaderboard);
    }, 3000);

    return () => clearTimeout(timer);
  }, [leaderboard]);

  return (
    <div
      style={{
        background:
          'radial-gradient(128% 107% at 100% 100%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
      className="group-hover:scale-[1.03] duration-300 border border-black-50 bg-black-75 overflow-hidden border-t-0 -top-6 -left-8 relative rounded-tr-none rounded-xl"
    >
      <ul className="divide-y-[1px] divide-black-50">
        {leaderboard.map((item, index) => (
          <motion.li
            key={item.id}
            layout
            transition={spring}
            className="flex items-center justify-between pl-7 pr-6 py-3"
          >
            <p className="text-white leading-none font-semibold tracking-tight font-onest">
              {item.name}
            </p>
            <div className="flex items-center space-x-1">
              {trend[item.id] === 'up' && <ChevronUp className="w-4 h-4 text-green-500" />}
              {trend[item.id] === 'down' && <ChevronDown className="w-4 h-4 text-red-500" />}
              {trend[item.id] === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
              <span className="text-gray-400 text-sm font-bold font-onest">{index + 1}</span>
            </div>
          </motion.li>
        ))}
        <li className="hidden sm:flex pl-7 pr-6 py-3 items-center gap-x-2 font-onest text-gray-400 text-sm">
          Top Users
          <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
        </li>
      </ul>
    </div>
  );
}
