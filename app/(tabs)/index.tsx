import React from 'react';
import HomeScreen, { HomeScreenProps } from './../../components/screens/HomeScreen';

const LandingPage: React.FC<HomeScreenProps> = (props) => {
  // You can add more logic here for LandingPage if needed
  return <HomeScreen {...props} />;
};

export default LandingPage;