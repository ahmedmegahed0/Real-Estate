import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { AdvantageSection } from './sections/AdvantageSection';
import { FeaturedProjects } from './sections/FeaturedProjects';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AdvantageSection />
      <FeaturedProjects />
    </>
  );
};
