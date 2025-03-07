import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const paths = {
    step1: {
        unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
        inBetween: 'M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z',
        filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
    },
    step2: {
        filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
        inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
        unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
    }
};

interface TransitionOverlayProps {
    isAnimating: boolean;
    onAnimationComplete: () => void;
    onMidpointReached: () => void;
}

const TransitionOverlay = ({ isAnimating, onAnimationComplete, onMidpointReached }: TransitionOverlayProps) => {
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const animationLockRef = useRef(false);

    useEffect(() => {
        // Only start animation if not already animating
        if (isAnimating && !animationLockRef.current && pathRef.current) {
            // Set animation lock
            animationLockRef.current = true;

            // Kill any existing timeline
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            timelineRef.current = gsap.timeline({
                onComplete: () => {
                    animationLockRef.current = false;
                    onAnimationComplete();
                },
                defaults: { duration: 0.4 } // Shorter default duration
            })
                .set(pathRef.current, {
                    attr: { d: paths.step1.unfilled }
                })
                .to(pathRef.current, { 
                    duration: 0.4,
                    ease: 'power3.in',
                    attr: { d: paths.step1.inBetween }
                })
                .to(pathRef.current, { 
                    duration: 0.2,
                    ease: 'power1',
                    attr: { d: paths.step1.filled },
                    onComplete: () => {
                        onMidpointReached();
                    }
                })
                .set(pathRef.current, { 
                    attr: { d: paths.step2.filled }
                })
                .to(pathRef.current, { 
                    duration: 0.2,
                    ease: 'sine.in',
                    attr: { d: paths.step2.inBetween }
                })
                .to(pathRef.current, { 
                    duration: 0.4,
                    ease: 'power4',
                    attr: { d: paths.step2.unfilled }
                });
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            // Reset lock on cleanup
            animationLockRef.current = false;
        };
    }, [isAnimating, onAnimationComplete, onMidpointReached]);

    return (
        <svg className="fixed inset-0 w-full h-full z-50 pointer-events-none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none">
            <path 
                ref={pathRef}
                className="fill-zinc-900"
                vectorEffect="non-scaling-stroke" 
                d={paths.step1.unfilled}
            />
        </svg>
    );
};

export default TransitionOverlay;
