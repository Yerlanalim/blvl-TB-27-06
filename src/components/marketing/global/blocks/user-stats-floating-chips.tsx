'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';

import TargetIcon from '@/components/ui/icons/target';
import LightbulbIcon from '@/components/ui/icons/lightbulb';
import StatsIcon from '@/components/ui/icons/stats';
import GlobeIcon from '@/components/ui/icons/globe';
import CreditCardIcon from '@/components/ui/icons/credit-card';

export default function FloatingChips() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <FloatingChip
        href="/roadmaps?category=business-basics"
        Icon={TargetIcon}
        top="10%"
        left="10%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip
        href="/roadmaps?category=marketing"
        Icon={LightbulbIcon}
        top="20%"
        right="15%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip
        href="/roadmaps?category=finance"
        Icon={CreditCardIcon}
        bottom="15%"
        left="20%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip
        href="/roadmaps?category=sales"
        Icon={GlobeIcon}
        bottom="25%"
        right="10%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <FloatingChip
        href="/roadmaps?category=management"
        Icon={StatsIcon}
        top="5%"
        left="50%"
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </>
  );
}

interface FloatingChipProps {
  Icon: React.ElementType;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  href?: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const FloatingChip: React.FC<FloatingChipProps> = ({ Icon, href, mouseX, mouseY, ...position }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });

  useEffect(() => {
    const unsubscribeX = mouseX.onChange((latestX) => {
      const deltaX = latestX - window.innerWidth / 2;
      // adjust divisor to control sensitivity
      x.set(deltaX / 20);
    });

    const unsubscribeY = mouseY.onChange((latestY) => {
      const deltaY = latestY - window.innerHeight / 2;
      // adjust divisor to control sensitivity
      y.set(deltaY / 20);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.a
      href={href}
      className="absolute bg-black border border-black-50 backdrop-blur-sm rounded p-4 flex items-center gap-2 text-sm text-white"
      style={{
        ...position,
        x,
        y,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={28} />
    </motion.a>
  );
};
