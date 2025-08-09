import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../components/screens/HomeScreen';
import PaymentScreen from '../components/screens/PaymentScreen';
import ScanningScreen from '../components/screens/ScanningScreen';
import SuccessScreen from '../components/screens/SuccessScreen';

export type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  Scanning: undefined;
  Success: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// This is the wrapper that passes the required props
const HomeScreenWrapper = () => {
  return (
    <HomeScreen
      userBalance={1000} // <- You can later make this dynamic
      onStartPayment={() => console.log('Starting payment...')}
    />
  );
};

const PaymentScreenWrapper = () => {
  return (
    <PaymentScreen
      merchantName ={''}
      paymentAmount ={''}
      onScanPress = {() => console.log('Starting onScanPress...')}
      onCancelPress = {() => console.log('Starting onCancelPress...')}

    />
  );
};

const ScanningScreenWrapper = () => {
  return (
    <ScanningScreen
      scanProgress={75}
      isScanning="In Progress"
      merchantName="Coffee Shop"
      paymentAmount="R45.00"
      onCancelPress={() => console.log('Scan cancelled')}
    />
  );
};

const SuccessScreenWrapper = () => {
  return (
    <SuccessScreen
      merchantName="Coffee Shop"
      paymentAmount="R45.00"
      onDone={() => console.log('Returning to home')}
    />
  );
};


export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreenWrapper} />
        <Stack.Screen name="Payment" component={PaymentScreenWrapper} />
        <Stack.Screen name="Scanning" component={ScanningScreenWrapper} />
        <Stack.Screen name="Success" component={SuccessScreenWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
