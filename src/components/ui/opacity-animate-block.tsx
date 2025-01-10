import React from 'react';
import { MotionDiv } from './motion-div';

interface Props {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export const OpacityAnimateBlock: React.FC<Props> = ({
  duration = 0.5,
  delay = 0,
  children,
  className,
}) => {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
      }}>
      {children}
    </MotionDiv>
  );
};
