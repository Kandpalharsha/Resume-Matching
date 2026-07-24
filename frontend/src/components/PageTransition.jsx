import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const comp = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(comp.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return <div ref={comp}>{children}</div>;
}
