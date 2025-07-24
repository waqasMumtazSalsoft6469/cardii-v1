import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import CarRentHomeScreen from '../Screens/CarRentHomeScreen/CarRentHomeScreen';
import RentalCarsList from '../Screens/P2pOnDemnadBid/RentalCarsList';
import navigationStrings from './navigationStrings';

const Stack = createNativeStackNavigator();

export default function ({ navigation }) {
    const { appData, appStyle } = useSelector((state) => state?.initBoot);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={navigationStrings.CAR_RENTAL_LIST} component={RentalCarsList} />
          
        </Stack.Navigator>
    );
}
