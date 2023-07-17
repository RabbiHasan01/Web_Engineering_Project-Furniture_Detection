import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const NumberCounter = () => {
  const navigate = useNavigate();
  const counterRef = useRef(null);

  useEffect(() => {
    const counterElement = counterRef.current;

    const animation = gsap.fromTo(
      counterElement,
      { innerHTML: '0', opacity: 0 },
      {
        innerHTML: '100',
        duration: 3,
        ease: 'power3.out',
        delay: 1,
        opacity: 1,
        onComplete: () => {
          navigate('/dashboard');
        },
      }
    );

    return () => {
      animation.kill(); // Cancels the animation if the component is unmounted before completion
    };
  }, [navigate]);

  return (
    <div
      style={{
        background: 'lightgray',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        ref={counterRef}
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'blue',
          fontFamily: 'Arial, sans-serif',
          margin: '2rem',
        }}
      >
        Loading...
      </h1>
    </div>
  );
};

export default NumberCounter;
