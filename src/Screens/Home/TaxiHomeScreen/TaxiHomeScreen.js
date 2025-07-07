import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, BackHandler, Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';

import Geocoder from 'react-native-geocoding';
import strings from '../../../constants/lang';
import staticStrings from '../../../constants/staticStrings';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  androidBackButtonHandler,
  getCurrentLocation,
  showError,
} from '../../../utils/helperFunctions';
import { chekLocationPermission } from '../../../utils/permissions';
import {
  TaxiHomeDashbord,
} from '../DashboardViews/Index';
// import DashBoardSeven from '../DashboardViews/DashBoardSeven';
import { MyDarkTheme } from '../../../styles/theme';
import socketServices from '../../../utils/scoketService';
import { getColorSchema } from '../../../utils/utils';

navigator.geolocation = require('react-native-geolocation-service');

export default function TaxiHomeScreen({ route, navigation }) {
  const paramData = route?.params;
  const { location, dineInType, appMainData } = useSelector(
    (state) => state?.home || {},
  );
  const { cartItemCount } = useSelector((state) => state?.cart || {});
  const {
    appData,
    themeColors,
    themeLayouts,
    currencies,
    languages,
    internetConnection,
    appStyle,
    isDineInSelected,
    themeColor,
    themeToggle,
    redirectedFrom
  } = useSelector((state) => state?.initBoot || {});
  const { userData } = useSelector((state) => state?.auth || {});
  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;

  const [state, setState] = useState({
    isLoading: true,
    latitude: location?.latitude,
    longitude: location?.longitude,
    slider1ActiveSlide: 0,
    // location: [],
    isRefreshing: false,
    updatedData: [],
    selectedTabType: '',
    updateTime: 0,
    isDineInSelected: false,
    locationObj: {},
  });

  const {
    updateTime,
    isLoading,
    longitude,
    latitude,
    slider1ActiveSlide,
    isRefreshing,
    themeLayout,
    updatedData,
    selectedTabType,
    locationObj,
  } = state;

  const memorizedAppData = useMemo(() => appData, [appData])
  const memorizsedAppMainData = useMemo(() => appMainData, [appMainData])
  const memorizsedLocation = useMemo(() => location, [location])


  useEffect(() => {
    if (!!userData?.auth_token && !!appData?.profile?.socket_url) {
      socketServices.initializeSocket(appData?.profile?.socket_url);
    }
  }, [appData]);





  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        androidBackButtonHandler,
      );
      return () => backHandler.remove();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      updateState({ isLoading: true });
      chekLocationPermission(true)
        .then((result) => {
          if (result !== 'goback') {
            getCurrentLocation('home')
              .then((res) => {
                if (
                  appMainData &&
                  typeof appMainData?.reqData == 'object' &&
                  appMainData?.reqData?.latitude &&
                  (location?.latitude == '' || location?.longitude == '')
                ) {
                  const data = {
                    address: appMainData?.reqData?.address,
                    latitude: appMainData?.reqData?.latitude,
                    longitude: appMainData?.reqData?.longitude,
                  };
                  actions.locationData(res);
                  updateState({ locationObj: res, isLoading: false });
                } else {
                  updateState({ locationObj: res });
                  if (appData?.profile?.preferences?.is_hyperlocal) {
                    if (!location?.address) {
                      actions.locationData(res);
                    }
                  }
                }
              })
              .catch((err) => {
                console.log('error raised', location);
                // console.log("default location",location)
                updateState({ locationObj: location, isLoading: true }); // if user not gave location permission then we set pannel lat lng.
              });
          }
        })
        .catch((error) => console.log('error while accessing location', error));
    }, []),
  );

  // useEffect(() => {
  //   chekLocationPermission(false)
  //     .then((result) => {
  //       if (result !== 'goback') {
  //         getCurrentLocation('home')
  //           .then((res) => {
  //             if (
  //               appMainData &&
  //               typeof appMainData?.reqData == 'object' &&
  //               appMainData?.reqData?.latitude &&
  //               (location?.latitude == '' || location?.longitude == '')
  //             ) {
  //               const data = {
  //                 address: appMainData?.reqData?.address,
  //                 latitude: appMainData?.reqData?.latitude,
  //                 longitude: appMainData?.reqData?.longitude,
  //               };
  //               actions.locationData(res);
  //               updateState({locationObj: res});
  //             } else {
  //               updateState({locationObj: res});
  //               if (appData?.profile?.preferences?.is_hyperlocal) {
  //                 if (!location?.address) {
  //                   actions.locationData(res);
  //                 }
  //               }
  //             }
  //           })
  //           .catch((err) => {
  //             console.log('error raised', location);
  //             // console.log("default location",location)
  //             updateState({locationObj: location}); // if user not gave location permission then we set pannel lat lng.
  //           });
  //       }
  //     })
  //     .catch((error) => console.log('error while accessing location', error));
  // }, []);
  const _getAllNearHosptital = async () => {
    const res = await getNearByPlacesMarker(locationObj?.latitude, locationObj?.longitude, "1500", ['restaurant'], 'AIzaSyASANrOuQldA-UM0Kj0cRirK9RxG6DAzzw')
    console.log(res, "res>>>>>>>>>")

  }
  useEffect(() => {
    updateState({ updatedData: appMainData?.categories });
  }, [appMainData]);

  useEffect(() => {
    if (
      paramData?.details &&
      paramData?.details?.formatted_address != location?.address
    ) {
      const address = paramData?.details?.formatted_address;
      const res = {
        address: address,
        latitude: paramData?.details?.geometry?.location.lat,
        longitude: paramData?.details?.geometry?.location.lng,
      };
      if (
        res?.latitude != location?.latitude &&
        res?.longitude != location?.longitude
      ) {
        if (cartItemCount?.data?.item_count) {
          checkCartWithLatLang(res);
        } else {
          updateLatLang(res);
        }
      } else {
        updateLatLang(res);
      }
    }
  }, [paramData?.details]);

  const checkCartWithLatLang = (res) => {
    Alert.alert('', strings.THIS_WILL_REMOVE_CART, [
      {
        text: strings.CANCEL,
        onPress: () => console.log('Cancel Pressed'),
        // style: 'destructive',
      },
      { text: strings.CLEAR_CART2, onPress: () => clearCart(res) },
    ]);
  };

  const clearCart = (location) => {
    updateLatLang(location);
    actions
      .clearCart(
        {},
        {
          code: appData?.profile?.code,
          currency: currencies?.primary_currency?.id,
          language: languages?.primary_language?.id,
          systemuser: DeviceInfo.getUniqueId(),
        },
      )
      .then((res) => {
        actions.cartItemQty(res);
        homeData(location);
      })
      .catch(errorMethod);
  };

  const updateLatLang = (res) => {
    updateState({ updateTime: Math.random() });
    actions.locationData(res);
  };
  useEffect(() => {
    if (updateTime) {
      homeData();
    }
  }, [updateTime]);
  useEffect(() => {
    Geocoder.init(Platform.OS=='ios'?appData?.profile?.preferences?.map_key_for_ios_app||appData?.profile?.preferences?.map_key:appData?.profile?.preferences?.map_key_for_app|| appData?.profile?.preferences?.map_key, { language: 'en' }); // set the language
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // homeData();
      getAllAddress();

    }, []),
  );

  useEffect(() => {
    if (redirectedFrom == 'from_deepLinking') {
      navigation.navigate(navigationStrings.TRACKING)
    }

  }, [redirectedFrom])

  // useEffect(() => {
  //   homeData();
  // }, [appMainData]);

  //get All address
  const getAllAddress = () => {
    // console.log("userData?.auth_token",userData?)
    if (!!(userData && userData?.auth_token)) {
      actions
        .getAddress(
          {},
          {
            code: appData?.profile?.code,
          },
        )
        .then((res) => {
          console.log(res, 'res>>>res');
          updateState({
            isLoadingB: false,
          });
          if (res.data) {
            actions.saveAllUserAddress(res.data);
          }
        })
        .catch(errorMethod);
    }
  };

  //Home data
  const homeData = () => {
    console.log('appData?.profile?.preferences', appData?.profile?.preferences);
    let latlongObj = {};
    if (appData?.profile?.preferences?.is_hyperlocal) {
      latlongObj = {
        address: locationObj?.address,
        latitude: locationObj?.latitude,
        longitude: locationObj?.longitude,
      };
    }



    var selectedVendorType = null;
    var defaultVendorType = null;

    if (!!appData?.profile && appData?.profile?.preferences?.vendorMode) {
      defaultVendorType = appData?.profile?.preferences?.vendorMode[0]?.type; //
      appData?.profile?.preferences?.vendorMode.forEach((val, i) => {
        if (val?.type == dineInType) {
          selectedVendorType = val.type;
        }
      });
    }

    if (!selectedVendorType) {

      actions.dineInData(defaultVendorType);
    }
    actions
      .homeData(
        {
          type: !!selectedVendorType ? selectedVendorType : defaultVendorType,
          ...latlongObj,
        },
        {
          code: appData?.profile?.code,
          currency: currencies?.primary_currency?.id,
          language: languages?.primary_language?.id,
          // ...latlongObj,
        },
      )
      .then((res) => {
        console.log('Home data++++++', res);
        if (
          appData?.profile?.preferences?.is_hyperlocal &&
          location?.latitude == '' &&
          location?.longitude == ''
        ) {
          if (
            typeof res?.data?.reqData == 'object' &&
            res?.data?.reqData?.latitude &&
            res?.data?.reqData?.longitude
          ) {
            const data = {
              address: res?.data?.reqData?.address,
              latitude: res?.data?.reqData?.latitude,
              longitude: res?.data?.reqData?.longitude,
            };
            actions.locationData(data);
          }
        } else {
          if (
            appData?.profile?.preferences?.is_hyperlocal &&
            location?.latitude != '' &&
            location?.longitude != ''
          ) {
          } else {
            const data = {
              address: '',
              latitude: '',
              longitude: '',
            };
            actions.locationData(data);
          }
        }
        setTimeout(() => {
          updateState({ isLoading: false, isRefreshing: false });
        }, 1000);
      })
      .catch(errorMethod);
  };

  //Error handling in screen
  const errorMethod = (error) => {
    console.log(error, 'error>>>>');
    updateState({ isLoading: false, isLoadingB: false, isRefreshing: false });
    showError(error?.message || error?.error);
  };

  //update state
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  //Naviagtion to specific screen
  const moveToNewScreen =
    (screenName, data = {}) =>
      () => {
        navigation.navigate(screenName, { data });
      };

  const { viewRef2, viewRef3, bannerRef } = useRef();

  //onPress Category
  const onPressCategory = (item) => {
    console.log(item, 'item>>>>>item');
    if (item.redirect_to == staticStrings.VENDOR) {
      moveToNewScreen(navigationStrings.VENDOR, item)();
    } else if (
      item.redirect_to == staticStrings.PRODUCT ||
      item.redirect_to == staticStrings.CATEGORY ||
      item.redirect_to == staticStrings.ONDEMANDSERVICE
    ) {
      // moveToNewScreen(navigationStrings.PRODUCT_LIST, item)();
      moveToNewScreen(navigationStrings.ADDADDRESS, item)();
    } else if (item.redirect_to == staticStrings.PICKUPANDDELIEVRY) {
      if (!!userData?.auth_token) {
        // if (item?.warning_page_id) {
        //   if (item?.warning_page_id == 2) {
        //     moveToNewScreen(navigationStrings.DELIVERY, item)();
        //   } else {
        //     moveToNewScreen(navigationStrings.HOMESCREENCOURIER, item)();
        //   }
        // } else {
        //   if (item?.template_type_id == 1) {
        //     moveToNewScreen(navigationStrings.SEND_PRODUCT, item)();
        //   } else {
        //     // moveToNewScreen(navigationStrings.MULTISELECTCATEGORY, item)();
        //     moveToNewScreen(navigationStrings.ADDADDRESS, item)();
        //   }
        // }
        actions.saveSchduleTime('now');
        moveToNewScreen(navigationStrings.ADDADDRESS, {
          ...item,
        })();
      } else {
        actions.setAppSessionData('on_login');
      }
    } else if (item.redirect_to == staticStrings.DISPATCHER) {
      // moveToNewScreen(navigationStrings.DELIVERY, item)();
    } else if (item.redirect_to == staticStrings.CELEBRITY) {
      moveToNewScreen(navigationStrings.CELEBRITY)();
    } else if (item.redirect_to == staticStrings.BRAND) {
      moveToNewScreen(navigationStrings.BRANDS)();
    } else if (item.redirect_to == staticStrings.SUBCATEGORY) {
      // moveToNewScreen(navigationStrings.PRODUCT_LIST, item)();
      moveToNewScreen(navigationStrings.VENDOR_DETAIL, { item })();
    } else if (!item.is_show_category || item.is_show_category) {
      item?.is_show_category
        ? moveToNewScreen(navigationStrings.VENDOR_DETAIL, {
          item,
          rootProducts: true,
          // categoryData: data,
        })()
        : moveToNewScreen(navigationStrings.PRODUCT_LIST, {
          id: item?.id,
          vendor: true,
          name: item?.name,
        })();

      // moveToNewScreen(navigationStrings.VENDOR_DETAIL, {item})();
    }
  };

  //On Press banner
  const bannerPress = (data) => {
    console.log(data, 'bannerPressdata');
    let item = {};
    if (data?.redirect_id) {
      if (data?.redirect_to == staticStrings.VENDOR) {
        item = {
          ...data?.vendor,
          redirect_to: data.redirect_to,
        };
      } else {
        item = {
          id: data.redirect_id,
          redirect_to: data.redirect_to,
          name: data.redirect_name,
        };
      }

      if (data.redirect_to == staticStrings.VENDOR) {
        data?.is_show_category
          ? moveToNewScreen(navigationStrings.VENDOR_DETAIL, {
            item,
            rootProducts: true,
            // categoryData: data,
          })()
          : moveToNewScreen(navigationStrings.PRODUCT_LIST, {
            id: data.redirect_id,
            vendor: true,
            name: data.redirect_name,
          })();
      } else if (data.redirect_to == staticStrings.CATEGORY) {
        moveToNewScreen(navigationStrings.PRODUCT_LIST, {
          id: data.redirect_id,
          // vendor: true,
          name: data.redirect_name,
        })();
      }
    }
  };

  //Reloads the screen
  const initApiHit = () => {
    let header = {};
    // console.log(languages?.primary_language?.id, 'languageID');
    if (languages?.primary_language?.id) {
      header = {
        code: appData?.profile?.code,
        language: languages?.primary_language?.id,
      };
    } else {
      header = {
        code: appData?.profile?.code,
      };
    }

    actions
      .initApp(
        {},
        header,
        true,
        currencies?.primary_currency,
        languages?.primary_language,
      )
      .then((res) => {
        console.log(res, 'initApp');
        // updateState({isRefreshing: false});
      })
      .catch((error) => {
        updateState({ isRefreshing: false });
      });
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({ isRefreshing: true });
    initApiHit();
    // homeData();
  };
  const updateCircleData = (data) => {
    updateState({ updatedData: data });
  };

  useEffect(() => {
    initApiHit();
  }, []);

  const selectedToggle = (type) => {
    actions.dineInData(type);
    updateState({
      selectedTabType: type,
    });
  };

  useEffect(() => {
    homeData();
  }, [selectedTabType, appData, dineInType]);

  ///onPressCategory2
  const onPressCategory2 = (data) => {
    if (data.redirect_to == staticStrings.VENDOR) {
      moveToNewScreen(navigationStrings.VENDOR, data)();
    } else if (
      data.redirect_to == staticStrings.PRODUCT ||
      data.redirect_to == staticStrings.CATEGORY
    ) {
      moveToNewScreen(navigationStrings.PRODUCT_LIST, data)();
    } else if (data.redirect_to == staticStrings.PICKUPANDDELIEVRY) {
      if (!!userData?.auth_token) {
        if (data?.warning_page_id) {
          if (data?.warning_page_id == 2) {
            moveToNewScreen(navigationStrings.DELIVERY, data)();
          } else {
            moveToNewScreen(navigationStrings.HOMESCREENCOURIER, data)();
          }
        } else {
          if (data?.template_type_id == 1) {
            moveToNewScreen(navigationStrings.SEND_PRODUCT, data)();
          } else {
            moveToNewScreen(navigationStrings.MULTISELECTCATEGORY, data)();
          }
        }
      } else {
        actions.setAppSessionData('on_login');
      }
    } else if (data.redirect_to == staticStrings.DISPATCHER) {
      // moveToNewScreen(navigationStrings.DELIVERY, data)();
    } else if (data.redirect_to == staticStrings.CELEBRITY) {
      moveToNewScreen(navigationStrings.CELEBRITY)();
    } else if (data.redirect_to == staticStrings.BRAND) {
      moveToNewScreen(navigationStrings.BRANDS)();
    } else if (data.redirect_to == staticStrings.SUBCATEGORY) {
      moveToNewScreen(navigationStrings.PRODUCT_LIST, data)();

      // moveToNewScreen(navigationStrings.VENDOR_DETAIL, { data })();
    } else if (!data.is_show_category || data.is_show_category) {
      let item = data;
      data?.is_show_category
        ? moveToNewScreen(navigationStrings.VENDOR_DETAIL, {
          item,
          rootProducts: true,
          // categoryData: data,
        })()
        : moveToNewScreen(navigationStrings.PRODUCT_LIST, {
          id: data?.id,
          vendor: true,
          name: data?.name,
        })();

      // moveToNewScreen(navigationStrings.VENDOR_DETAIL, {item})();
    }
  };


  const renderHomeScreen = () => {

    switch (appStyle?.homePageLayout) {
      case 4:
        return (
          <TaxiHomeDashbord
            handleRefresh={() => handleRefresh()}
            bannerPress={(item) => bannerPress(item)}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            onPressCategory={(item) => onPressCategory(item)}
            selectedToggle={selectedToggle}

            appMainData={memorizsedAppMainData}
            toggleData={memorizedAppData}
            location={memorizsedLocation}

            currentLocation={locationObj}
          />
        );
      case 5:
        return (
          <View>

          </View>

          // <DashBoardSeven
          //   handleRefresh={() => handleRefresh()}
          //   bannerPress={(item) => bannerPress(item)}
          //   isLoading={isLoading}
          //   isRefreshing={isRefreshing}
          //   appMainData={appMainData}
          //   onPressCategory={(item) => {
          //     onPressCategory(item);
          //   }}
          //   isDineInSelected={isDineInSelected}
          //   selcetedToggle={false}
          //   toggleData={appData}
          //   navigation={navigation}
          // />
        );
    }
  };
  // console.log(appMainData, 'appMainData');
  return (
    <View style={{
      flex: 1,
      backgroundColor: isDarkMode
        ? MyDarkTheme.colors.background
        : colors.white,
    }}>
      {renderHomeScreen()}
    </View>
  );
}