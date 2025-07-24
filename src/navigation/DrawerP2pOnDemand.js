import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import React from 'react';
import { Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import CustomDrawerContent from '../Components/CustomDrawerContent';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import staticStrings from '../constants/staticStrings';
import BrandStack from './BrandStack';
import CartStack from './CartStack';
import CelebrityStack from './CelebrityStack';
import navigationStrings from './navigationStrings';
import TabRoutes from './TabRoutes';
import TabRoutesEcommerce from './TabRoutesEcommerce';
import TabRoutesP2p from './TabRoutesP2p';
import TaxiTabRoutes from './TaxiTabRoutes';
import { WebLinks } from '../Screens';
import TabRoutesOnDemandP2p from './TabRoutesP2pOnDemand';
// import CustomP2pOnDemandDrawer from '../Components/CustomP2pOnDemandDrawer';

const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
export default function DrawerP2pOnDemand(props) {

  const appMainData = useSelector((state) => state?.home?.appMainData);
  const {appStyle, appData } = useSelector((state) => state?.initBoot); 
  const businessType = appStyle?.homePageLayout;

  console.log("<<<<<<<<<<<<<<<<<<<<<<<<********************* Business Type: TabRoutesOnDemandP2p *********>>>>>>>>>>>>>>>>>>>>>>>>>>>>", businessType);
  
  const allCategory = appMainData?.categories;
  const checkForCeleb = appData?.profile?.preferences?.celebrity_check;

  const checkForBrand =
    allCategory &&
    allCategory.find((x) => x?.redirect_to == staticStrings.BRAND);

  var celebTab = null;
  var brandTab = null;
  var gestureEnabled = true;
  var swipeEnabled = true;
  if (checkForCeleb) {
    celebTab = (
      <Drawer.Screen
        component={CelebrityStack}
        name={navigationStrings.CELEBRITY}
        options={{
          gestureEnabled: gestureEnabled,
          swipeEnabled: swipeEnabled,
          drawerLabel: strings.CELEBRITY,
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? imagePath.tabDActive : imagePath.tabDInActive}
            />
          ),
        }}
      />
    );
  }

  if (checkForBrand) {
    brandTab = (
      <Drawer.Screen
        component={BrandStack}
        name={navigationStrings.BRANDS}
        options={{
          gestureEnabled: gestureEnabled,
          swipeEnabled: swipeEnabled,
          drawerLabel: strings.BRANDS,
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? imagePath.tabCActive : imagePath.tabCInActive}
            />
          ),
        }}
      />
    );
  }


  return (
    <Drawer.Navigator
      drawerPosition={'left'}
      backBehavior={'none'}
      drawerType={'front'}
      overlayColor={'rgba(0,0,0,0.6)'}
      drawerContent={(props) => <CustomP2pOnDemandDrawer {...props} />}
      screenOptions={{ drawerStyle: { width }, headerShown: false }}
      initialRouteName={navigationStrings.MAINP2PTABS}
    >

      <Drawer.Screen
        component={TabRoutesOnDemandP2p}
        name={navigationStrings.MAINP2PTABS}

      />

      {/* <Drawer.Screen
        component={CartStack}
        name={navigationStrings.CART}
      />


      <Drawer.Screen
        name={navigationStrings.WEBLINKS}
        component={WebLinks}
        options={{ headerShown: false}}
        
      />
      {brandTab}
      {celebTab} */}

    </Drawer.Navigator>
  );
}
