import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemWithAnimationProps {
  children: React.ReactNode;
  delay: number;
}

const timelineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * タイムラインのアニメーション用のコンポーネント
 * @param param0
 * @returns
 */
export const TimelineItemWithAnimation: React.FC<
  TimelineItemWithAnimationProps
> = ({ children, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (inView) {
    controls.start('visible');
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={timelineVariants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
