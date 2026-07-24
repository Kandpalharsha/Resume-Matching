import React from 'react';
import Hero from '../components/Hero';
import PageTransition from '../components/PageTransition';

export default function Landing() {
  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  );
}
