import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import CustomBottomTabBar from '../Components/CustomBottomTabBar';
import CustomBottomTabBarFive from '../Components/CustomBottomTabBarFive';
import CustomBottomTabBarFour from '../Components/CustomBottomTabBarFour';
import CustomBottomTabBarThree from '../Components/CustomBottomTabBarThree';
import CustomBottomTabBarTwo from '../Components/CustomBottomTabBarTwo';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import staticStrings from '../constants/staticStrings';
import colors from '../styles/colors';
import { moderateScale, textScale } from '../styles/responsiveSize';
import { appIds } from '../utils/constants/DynamicAppKeys';
import AccountStack from './AccountStack';
import BrandStack from './BrandStack';
import CartStack from './CartStack';
import CelebrityStack from './CelebrityStack';
import HomeStack from './HomeStack';
import MyOrdersStack from './MyOrdersStack';
import P2pChatStack from './P2pChatStack';
import P2pOrderStack from './P2pOrderStack';
import PostStack from './PostStack';
import SearchProductVendorStack from './SearchProductVendorStack';
import navigationStrings from './navigationStrings';

const Tab = createBottomTabNavigator();

let showBottomBar_ = true;

export default function TabRoutes(props) {

  const { cartItemCount } = useSelector((state) => state?.cart || {});
  const { appMainData, dineInType } = useSelector((state) => state?.home) || {};
  const { appStyle, appData, redirectedFrom } = useSelector((state) => state?.initBoot || {});

  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesData();
  const businessType = appStyle?.homePageLayout;


  const allCategory = appMainData?.categories;
  const checkForCeleb = appData?.profile?.preferences?.celebrity_check;

  const checkForBrand =
    allCategory &&
    allCategory.find((x) => x?.redirect_to == staticStrings.BRAND);

  var celebTab = null;
  var brandTab = null;

  const getTabBarVisibility = (route, navigation, screens = []) => {
    if (navigation && navigation.isFocused && navigation.isFocused()) {
      const route_name = getFocusedRouteNameFromRoute(route);
      if (screens.includes(route_name)) {
        showBottomBar_ = false;
        return false;
      }
      showBottomBar_ = true;
      return true;
    }
  };


  const getCustomTabBar = (props) => {
    if (showBottomBar_) {
      switch (appStyle?.tabBarLayout) {
        case 1:
          return <CustomBottomTabBar {...props} />;
        case 2:
          return <CustomBottomTabBarTwo {...props} />;
        case 3:
          return <CustomBottomTabBarThree {...props} />;
        case 4:
          return <CustomBottomTabBarFour {...props} />;
        case 5:
          return <CustomBottomTabBarFive {...props} />;
        default:
          return <CustomBottomTabBar {...props} />;
      }
    }
  }

  const getHomeIcons = (focused = false) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.homeRedActive
          : imagePath.homeRedInActive;
      case 4:
        return focused
          ? imagePath.homeActive
          : imagePath.homeInActive;
      default:
        return focused
          ? imagePath.tabAActive
          : imagePath.tabAInActive;
    }
  }


  const getMyOrderIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused ? imagePath.ordersRedActive : imagePath.myOrder2;
      case 4:
        return imagePath.myOrder2;

      default:
        return focused
          ? imagePath.tabEActive
          : imagePath.tabEInActive;
    }
  }

  const getAccountIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.accountRedActive
          : imagePath.accountRedInActive;
      case 4:
        return focused
          ? imagePath.profileActive
          : imagePath.profileInActive;

      default:
        return focused
          ? imagePath.tabEActive
          : imagePath.tabEInActive
    }
  }

  const getSearchProductIcons = (focused = false) => {
    switch (appStyle?.tabBarLayout) {
      default:
        return focused
          ? imagePath.tabEActive
          : imagePath.tabEInActive
    }
  }

  const getCelebrityIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.icCelebActive
          : imagePath.icCelebInActive;
      case 4:
        return focused
          ? imagePath.icCelebActive1
          : imagePath.icCelebInActive1;

      default:
        return focused
          ? imagePath.tabDActive
          : imagePath.tabDInActive
    }
  }

  const getBrandsIcon = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.brandsActive1
          : imagePath.brandsInActive1
      case 4:
        return focused
          ? imagePath.icBrandActive
          : imagePath.icBrandInActive

      default:
        return focused
          ? imagePath.tabCActive
          : imagePath.tabCInActive
    }
  }

  const getCartIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.cartRedActive
          : imagePath.cartRedInActive
      case 4:
        return focused
          ? imagePath.ordersActive
          : imagePath.ordersInActive

      default:
        return focused
          ? imagePath.cartActive
          : imagePath.cartInActive
    }
  }


  const getChatIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.ic_chat4_active
          : imagePath.ic_chat4_inactive
      case 4:
        return focused
          ? imagePath.ic_chat_grad_active
          : imagePath.ic_chat_grad_inactive

      default:
        return focused
          ? imagePath.ic_chat1_active
          : imagePath.ic_chat1_inactive
    }
  }



  const getOrdersIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.ic_order4_active
          : imagePath.ic_order4_inactive
      case 4:
        return focused
          ? imagePath.ordersActive
          : imagePath.ordersInActive

      default:
        return focused
          ? imagePath.ic_order2_active
          : imagePath.ic_order2_inactive
    }
  }

  const getAddPostIcons = (focused) => {
    switch (appStyle?.tabBarLayout) {
      case 5:
        return focused
          ? imagePath.ic_add_post4_active
          : imagePath.ic_add_post4_inactive
      case 4:
        return focused
          ? imagePath.ic_add_post_grad
          : imagePath.ic_add_post_grad_inactive

      default:
        return focused
          ? imagePath.ic_post1_active
          : imagePath.ic_post1_inactive
    }
  }

  const getTintColor = (focused = false, tintColor) => {
    return appStyle?.tabBarLayout === 1 ? focused ? colors.white : colors.whiteOpacity77 : appStyle?.tabBarLayout === 4 ? null : tintColor
  }


  if (checkForCeleb) {
    celebTab = (
      <Tab.Screen
        component={CelebrityStack}
        name={navigationStrings.CELEBRITY}
        options={() => ({
          tabBarLabel: strings.CELEBRITY,
          tabBarIcon: ({ focused, tintColor }) => {
            return <FastImage
              tintColor={getTintColor(focused, tintColor)}
              style={styles.iconStyle}
              source={getCelebrityIcons(focused)}
            />
          },
        })}
      />
    );
  }


  if (checkForBrand) {
    brandTab = (
      <Tab.Screen
        component={BrandStack}
        name={navigationStrings.BRANDS}
        options={({ route }) => ({
          tabBarLabel: strings.BRANDS,
          tabBarIcon: ({ focused, tintColor }) => {
            return (
              <FastImage
                tintColor={getTintColor(focused, tintColor)}
                style={styles.iconStyle}
                source={getBrandsIcon(focused)}
              />
            )
          },
        })}
      />
    );
  }


  return (
    <Tab.Navigator
      backBehavior={navigationStrings.HOMESTACK}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabelStyle
      }}
      tabBar={getCustomTabBar}
      initialRouteName={
        redirectedFrom == 'cart'
          ? navigationStrings.CART
          : navigationStrings.HOMESTACK
      }
    >
      <Tab.Screen
        component={HomeStack}
        name={navigationStrings.HOMESTACK}
        options={({ route, navigation }) => ({
          tabBarVisible: getTabBarVisibility(route, navigation, [
            navigationStrings.PRODUCTDETAIL,
            navigationStrings.ADDADDRESS,
            navigationStrings.CHOOSECARTYPEANDTIMETAXI,
            navigationStrings.BRANDDETAIL,
            navigationStrings.P2P_PRODUCT_DETAIL,
            navigationStrings.P2P_PRODUCTS,
            navigationStrings.PRODUCT_PRICE_DETAILS,
            navigationStrings.PAYMENT_SCREEN,
          ]),
          tabBarLabel: strings.HOME,
          tabBarIcon: ({ focused, tintColor }) => {
            return (
              <FastImage
                style={styles.iconStyle}
                tintColor={getTintColor(focused, tintColor)}
                source={getHomeIcons(focused)}
                resizeMode="contain"
              />
            )
          },
        })}
      />

      {DeviceInfo.getBundleId() == appIds.sorDelivery && (
        <Tab.Screen
          component={SearchProductVendorStack}
          name={navigationStrings.SEARCH}
          options={() => ({
            tabBarLabel: strings.SEARCH,
            tabBarIcon: ({ focused, tintColor }) => (
              <FastImage
                tintColor={getTintColor(focused, tintColor)}
                style={styles.iconStyle}
                source={getSearchProductIcons(focused)}
              />
            ),
          })}
        />
      )}

      {dineInType !== "p2p" && <Tab.Screen
        component={CartStack}
        name={navigationStrings.CART}
        options={({ route, navigation }) => ({
          tabBarVisible: getTabBarVisibility(route, navigation, [
            navigationStrings.PRODUCTDETAIL,
          ]),
          tabBarLabel: strings.CART,
          tabBarIcon: ({ focused, tintColor }) => (
            <View style={{ alignItems: 'center' }}>
              {cartItemCount?.data?.item_count ? (
                <View
                  style={{
                    ...styles.cartItemCountView,
                    width:
                      cartItemCount?.data?.item_count > 999
                        ? moderateScale(23)
                        : moderateScale(20),
                    height:
                      cartItemCount?.data?.item_count > 999
                        ? moderateScale(23)
                        : moderateScale(20),
                    top: cartItemCount?.data?.item_count > 999 ? -10 : -7,
                    right: cartItemCount?.data?.item_count > 999 ? -13 : -8,
                  }}>
                  <Text style={styles.cartItemCountNumber}>
                    {cartItemCount?.data?.item_count > 999
                      ? '999+'
                      : cartItemCount?.data?.item_count}
                  </Text>
                </View>
              ) : null}
              <Image
                style={[
                  { tintColor: appStyle?.tabBarLayout === 4 ? null : appStyle?.tabBarLayout === 1 ? colors.white : tintColor, opacity: focused ? 1 : 0.6 },
                  { height: 20, width: 20 },
                ]}
                source={
                  getCartIcons(focused)
                }
              />
            </View>
          ),
          unmountOnBlur: true,
          gestureEnabled: true,
        })}
      />}

      {dineInType !== "p2p" && appStyle?.tabBarLayout === 5 && (
        <Tab.Screen
          component={MyOrdersStack}
          name={navigationStrings.MYORDERSSTACK}
          options={() => ({
            tabBarLabel: strings.ORDERS,
            tabBarIcon: ({ focused, tintColor }) => (
              <FastImage
                style={styles.iconStyle}
                tintColor={getTintColor(focused, tintColor)}
                source={getMyOrderIcons(focused)}


              />
            ),
          })}
        />
      )}

      {dineInType !== "p2p" && brandTab}
      {dineInType !== "p2p" && celebTab}


      {dineInType == "p2p" && <Tab.Screen
        component={P2pOrderStack}
        name={navigationStrings.P2P_ORDER_STACK}
        options={({ route, navigation }) => ({
          tabBarVisible: getTabBarVisibility(route, navigation, [
            navigationStrings.CHAT_SCREEN,
            navigationStrings.P2P_PRODUCT_DETAIL,
          ]),
          tabBarLabel: strings.ORDER,
          tabBarIcon: ({ focused, tintColor }) => (
            <FastImage
              style={styles.iconStyle}
              tintColor={getTintColor(focused, tintColor)}
              source={getOrdersIcons(focused)}
              resizeMode="contain"

            />
          ),
        })}
      />}


      {dineInType == "p2p" && <Tab.Screen
        component={PostStack}
        name={navigationStrings.POST}
        options={({ route, navigation }) => ({
          tabBarVisible: getTabBarVisibility(route, navigation, []),
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor }) => (
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              height: 20, width: 20
            }}>
              <Image
                style={{
                  height: 40, width: 40,
                  position: "absolute",
                  tintColor: getTintColor(focused, tintColor)
                }}
                source={getAddPostIcons(focused)}
              />
            </View>

          ),
        })}
      />}
      {dineInType == "p2p" &&
        <Tab.Screen
          component={P2pChatStack}
          name={navigationStrings.CHAT_STACK}
          options={({ route, navigation }) => ({
            tabBarVisible: getTabBarVisibility(route, navigation, [
              navigationStrings.CHAT_SCREEN,

            ]),
            tabBarLabel: strings.CHATS,
            tabBarIcon: ({ focused, tintColor }) => (
              <FastImage
                style={styles.iconStyle}
                tintColor={getTintColor(focused, tintColor)}
                source={getChatIcons(focused)}
                resizeMode="contain"
              />
            ),
          })}
        />}
      <Tab.Screen
        component={AccountStack}
        name={navigationStrings.ACCOUNTS}
        options={() => ({
          tabBarLabel: strings.ACCOUNTS,
          tabBarIcon: ({ focused, tintColor }) => (
            <FastImage
              style={styles.iconStyle}
              tintColor={getTintColor(focused, tintColor)}
              source={getAccountIcons(focused)}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export function stylesData(params) {
  const { themeColors, appStyle } = useSelector((state) => state.initBoot);
  const fontFamily = appStyle?.fontSizeData;

  const styles = StyleSheet.create({
    cartItemCountView: {
      position: 'absolute',
      zIndex: 100,
      backgroundColor: colors.cartItemPrice,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartItemCountNumber: {
      fontFamily: fontFamily?.bold,
      color: colors.white,
      fontSize: textScale(8),
    },
    tabBarLabelStyle: {
      textTransform: 'capitalize',
      fontFamily: fontFamily?.medium,
      fontSize: textScale(12),
      color: colors.white,
    },
    iconStyle: {
      height: moderateScale(20),
      width: moderateScale(20),


    }
  });
  return styles;
}
