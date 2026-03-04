import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    once?: boolean;
}

export const Reveal = ({
    children,
    width = '100%',
    delay = 0.1,
    duration = 0.5,
    direction = 'up',
    className = '',
    once = true,
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    if (direction === 'none') {
        variants.hidden = { opacity: 0 };
    }

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                style={{ width: '100%', height: '100%' }}
            >
                {children}
            </motion.div>
        </div>
    );
};
