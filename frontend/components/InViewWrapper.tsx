import React, { ReactNode } from 'react';
import { useInView } from 'react-hook-inview';


type Props = {
  animation?: string;
  rootMargin?: string;
  threshold?: number | number[];
  unobserveOnEnter?: boolean;
  children: ReactNode;
};

export default function InViewWrapper(props: Props) {
  const [ref, inView] = useInView({
    rootMargin: props.rootMargin,
    threshold: props.threshold,
    unobserveOnEnter: props.unobserveOnEnter,
  });

  return (
    <div
      className={`${props.animation || 'enter-up'}${inView ? ' in-view' : ''}`}
      ref={ref}
    >
      {props.children}
    </div>
  );
}
