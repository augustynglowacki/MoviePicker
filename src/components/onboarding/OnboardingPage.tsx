import React from 'react';
import DetailsOnboard from 'src/assets/onboarding/DetailsOnboard';
import PopularOnboard from 'src/assets/onboarding/PopularOnboard';
import ProfileOnboard from 'src/assets/onboarding/ProfileOnboard';
import StartOnboard from 'src/assets/onboarding/StartOnboard';

export const BACKGROUND_COLOR = '#F1F1F1';

export interface PageInterface {
  title: string;
  description: string;
  source: React.ReactNode;
}

export const PAGES: PageInterface[] = [
  {
    title: 'Welcome to MoviePicker!',
    description:
      'The top of the deck has the same matching graphic in black outline and embodies an overall mellow concave.',
    source: <StartOnboard />,
  },
  {
    title: 'Popular',
    description:
      'A durable deck featured with a menacing face of a samurai at the center of the underside accompanied with a large red sun motif.',
    source: <PopularOnboard />,
  },
  {
    title: 'Details',
    description:
      "You don't have time to consider wheter the graphic on your CSS board would be considered modernist.",
    source: <DetailsOnboard />,
  },
  {
    title: 'Your Profile',
    description:
      'The top of the deck has the same matching graphic in black outline and embodies an overall mellow concave.',
    source: <ProfileOnboard />,
  },
];
