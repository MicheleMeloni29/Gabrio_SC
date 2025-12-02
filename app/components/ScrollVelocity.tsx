import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  if (range === 0) {
    return min;
  }
  const result = (((value - min) % range) + range) % range;
  return result + min;
}

function mapRange([inputMin, inputMax]: [number, number], [outputMin, outputMax]: [number, number], value: number) {
  if (inputMax === inputMin) {
    return outputMin;
  }
  const progress = (value - inputMin) / (inputMax - inputMin);
  return outputMin + progress * (outputMax - outputMin);
}

const VelocityText: React.FC<VelocityTextProps> = ({
  children,
  baseVelocity,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = '',
  scrollerClassName = '',
  parallaxStyle,
  scrollerStyle
}) => {
  const baseX = useRef(0);
  const [x, setX] = useState('0px');
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const scrollTarget = scrollContainerRef?.current ?? null;
  const directionFactor = useRef(1);
  const targetVelocityRef = useRef(0);
  const velocityFactorRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const targetElement: HTMLElement | Window = scrollTarget ?? window;
    const getScrollPosition = () => {
      if (scrollTarget) {
        return scrollTarget.scrollTop;
      }
      return window.scrollY ?? window.pageYOffset ?? 0;
    };

    let lastPosition = getScrollPosition();
    let lastTimestamp = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const currentPosition = getScrollPosition();
      const delta = currentPosition - lastPosition;
      const deltaTime = Math.max(now - lastTimestamp, 1);
      const velocity = (delta / deltaTime) * 1000;
      targetVelocityRef.current = mapRange(
        velocityMapping.input,
        velocityMapping.output,
        velocity
      );

      lastPosition = currentPosition;
      lastTimestamp = now;
    };

    handleScroll();

    targetElement.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);

    return () => {
      targetElement.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, [scrollTarget, velocityMapping]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let animationFrame: number;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      const currentVelocity = velocityFactorRef.current;
      const targetVelocity = targetVelocityRef.current;
      const springForce = stiffness * (targetVelocity - currentVelocity);
      const dampingForce = damping * currentVelocity;
      const updatedVelocity = currentVelocity + (springForce - dampingForce) * deltaSeconds;
      velocityFactorRef.current = updatedVelocity;

      let moveBy = directionFactor.current * baseVelocity * deltaSeconds;

      if (updatedVelocity < 0) {
        directionFactor.current = -1;
      } else if (updatedVelocity > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * updatedVelocity;
      baseX.current += moveBy;

      if (copyWidth <= 0) {
        setX('0px');
      } else {
        setX(`${wrap(-copyWidth, 0, baseX.current)}px`);
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [baseVelocity, copyWidth, damping, stiffness]);

  const spans = Array.from({ length: numCopies }, (_, index) => (
    <span className={`shrink-0 ${className}`} key={index} ref={index === 0 ? copyRef : null}>
      {children}
    </span>
  ));

  return (
    <div className={`relative overflow-hidden ${parallaxClassName}`} style={parallaxStyle}>
      <div
        className={`flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-20 ${scrollerClassName}`}
        style={{ transform: `translate3d(${x}, 0, 0)`, ...(scrollerStyle ?? {}) }}
      >
        {spans}
      </div>
    </div>
  );
};

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
