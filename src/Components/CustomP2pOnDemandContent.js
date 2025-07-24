// import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { dummyUser, rectImage } from "../constants/constants";
import imagePath from "../constants/imagePath";
import strings from "../constants/lang";
import navigationStrings from "../navigation/navigationStrings";
import actions from "../redux/actions";
import colors from "../styles/colors";
import commonStylesFun from "../styles/commonStyles";
import { moderateScale, moderateScaleVertical } from "../styles/responsiveSize";
import { MyDarkTheme } from "../styles/theme";
import { getColorSchema } from "../utils/utils";
import ButtonComponent from "./ButtonComponent";
import { BlurView } from "@react-native-community/blur"; // or 'expo-blur'

const items = [
  {
    label: strings.MY_ORDERS,
    icon: imagePath.vehicle,
    screen: navigationStrings.TAB_ROUTES,
  },
  {
    label: strings.WISHLIST,
    icon: imagePath.favourite,
    screen: navigationStrings.WISHLIST,
  },
  {
    label: strings.MYSUBSCRIPTION,
    icon: imagePath.group,
    screen: navigationStrings.MYSUBSCRIPTION,
  },
  {
    label: strings.MYLOYALTY,
    icon: imagePath.loyalty,
    screen: navigationStrings.MYSUBSCRIPTION,
  },
  {
    label: strings.MYWALLET,
    icon: imagePath.walletp2p,
    screen: navigationStrings.MYWALLET,
  },
  {
    label: strings.REFER_EARN,
    icon: imagePath.shortCut,
    screen: navigationStrings.MYSUBSCRIPTION,
  },
  {
    label: strings.PRIVACY_POLICY,
    icon: imagePath.icPrivacy,
    screen: navigationStrings.WEBLINKS,
    params: { id: 1 },
  },
  {
    label: strings.TERMS_CONDITIONS,
    icon: imagePath.icTerms,
    screen: navigationStrings.WEBLINKS,
    params: { id: 2 },
  },
  {
    label: strings.LOGOUT,
    icon: imagePath.logoutp2p,
    // screen: navigationStrings.WEBLINKS,
  },
];

const CustomP2pOnDemandContent = (props) => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state?.auth?.userData || null);
  const { appStyle, themeColors } = useSelector((state) => state?.initBoot);
  const fontFamily = appStyle?.fontSizeData;
  const commonStyles = commonStylesFun({ fontFamily });
  const theme = useSelector((state) => state?.initBoot?.themeColor);
  const toggleTheme = useSelector((state) => state?.initBoot?.themeToggle);
  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;

  const currentTab = useRef(1);

  const imageStyle = {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  };

  const onPressWishList = (index) => {
    if (!!userData?.auth_token) {
      currentTab.current = index;
      navigation.navigate(navigationStrings.WISHLIST, {
        isComeFromDrawer: true,
      });
    } else {
      actions.setAppSessionData("on_login");
    }
  };

  const onPressLoginLogout = () => {
    if (!!userData?.auth_token) {
      Alert.alert("", strings.LOGOUT_SURE_MSG, [
        {
          text: strings.CANCEL,
          onPress: () => console.log("Cancel Pressed"),
          // style: 'destructive',
        },
        {
          text: strings.CONFIRM,
          onPress: () => {
            actions.userLogout();
            actions.cartItemQty("");
            actions.saveAddress("");
            actions.addSearchResults("clear");
            actions.setAppSessionData("on_login");
          },
        },
      ]);
    } else {
      actions.setAppSessionData("on_login");
    }
  };

  const onPressItem = (screenName, index) => {
    currentTab.current = index;
    navigation.navigate(screenName);
  };

  const onPressPrivacyPolicy = (id, index) => {
    currentTab.current = index;
    navigation.navigate(navigationStrings.WEBLINKS, {
      id: id,
      isComeFromDrawer: true,
    });
  };

  const onPressProfile = () => {
    if (!!userData?.auth_token) {
      navigation.navigate(navigationStrings.ACCOUNTS, {
        isComeFromDrawer: true,
      });
    } else {
      actions.setAppSessionData("on_login");
    }
  };
  return (
    <>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={onPressProfile}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FastImage
            source={
              userData?.source?.uri
                ? {
                    uri: userData?.source?.uri,
                    priority: FastImage.priority.high,
                  }
                : { uri: rectImage }
            }
            style={[styles.profileImage, {borderColor: isDarkMode ? colors.white : colors.secondaryColor }]}
          />
          <View style={{ marginLeft: moderateScale(12) }}>
            <Text
              numberOfLines={1}
              style={[
                styles.profileName,
                {
                  color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                },
              ]}
            >
              {`Hi! ${!!userData?.name ? userData?.name : strings.GUEST_USER}`}
            </Text>
            <Text
              style={[
                styles.viewProfileText,
                {
                  color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                },
              ]}
            >
              View Profile
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {items.map((item, index) => {
        // item.screen = item.screen || navigationStrings.TAB_ROUTES;
        // item.params = item.params || {};
        // item.icon = item.icon || imagePath.icCat;
        // item.label = item.label || strings.HOME;
        return (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => {
              if (item.screen === navigationStrings.WEBLINKS) {
                onPressPrivacyPolicy(item.params.id, index);
              } else {
                onPressItem(item.screen, index);
              }
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      borderColor: isDarkMode
                        ? colors.white
                        : colors.secondaryColor,
                    },
                  ]}
                >
                  <Image
                    source={item.icon}
                    style={{
                      width: moderateScale(
                        item.label === strings.PRICACY_POLICY ||
                          item.label === strings.TERMS_CONDITIONS
                          ? 35
                          : 23
                      ),
                      height: moderateScale(
                        item.label === strings.PRICACY_POLICY ||
                          item.label === strings.TERMS_CONDITIONS
                          ? 35
                          : 23
                      ),
                      tintColor: isDarkMode
                        ? colors.white
                        : colors.secondaryColor,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    color: isDarkMode ? colors.white : colors.black,
                    fontSize: moderateScale(14),
                    fontFamily: "Poppins-Medium",
                    marginLeft: moderateScale(12),
                  }}
                >
                  {item.label}
                </Text>
              </View>
              <Image
                source={imagePath.ic_right_arrow}
                style={{
                  width: moderateScale(17),
                  height: moderateScale(17),
                  tintColor: isDarkMode ? colors.white : colors.greyColor4,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       // backgroundColor: isDarkMode
  //       //   ? MyDarkTheme.colors.background
  //       //   : colors.white,
  //     }}
  //   >

  //     <SafeAreaView style={{ flex: 1 }}>
  //       <View style={{ flex: 0.8 }}>
  //         <TouchableOpacity
  //           style={{
  //             alignSelf: "center",
  //           }}
  //           activeOpacity={0.7}
  //           onPress={onPressProfile}
  //         >
  //           <FastImage
  //             source={
  //               userData?.source?.uri
  //                 ? {
  //                     uri: userData?.source?.uri,
  //                     priority: FastImage.priority.high,
  //                   }
  //                 : { uri: dummyUser }
  //             }
  //             style={{
  //               height: moderateScale(80),
  //               width: moderateScale(80),
  //               borderRadius: moderateScale(40),
  //             }}
  //           />

  //           <Text
  //             numberOfLines={1}
  //             style={{
  //               ...commonStyles.buttonTextWhite,
  //               marginVertical: moderateScaleVertical(8),
  //               color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
  //             }}
  //           >
  //             {!!userData?.name ? userData?.name : strings.GUSET_USER}
  //           </Text>
  //         </TouchableOpacity>

  //         <DrawerItem
  //           label={strings.HOME}
  //           onPress={() =>
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: navigationStrings.TAB_ROUTES }],
  //             })
  //           }
  //           icon={({ focused }) => {
  //             return (
  //               <Image
  //                 style={{
  //                   ...imageStyle,
  //                   resizeMode: "contain",
  //                   tintColor: themeColors.primary_color,
  //                 }}
  //                 source={imagePath.icEcomHomeInactive}
  //               />
  //             );
  //           }}
  //           labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
  //         />
  //         {!!userData && (
  //           <DrawerItem
  //             label={"Order Again"}
  //             onPress={() => onPressItem(navigationStrings.ORDER_AGAIN, 2)} //tabIndex
  //             icon={({ focused }) => {
  //               return (
  //                 <Image
  //                   style={{
  //                     ...imageStyle,
  //                     resizeMode: "contain",
  //                     tintColor: themeColors.primary_color,
  //                   }}
  //                   source={imagePath.icRepeat}
  //                 />
  //               );
  //             }}
  //             labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
  //           />
  //         )}

  //         {/* <DrawerItem
  //           label={strings.CATEGORY}
  //           onPress={() => onPressItem(navigationStrings.CATEGORY, 2)} //screenName, tabIndex
  //           icon={({ focused }) => {
  //             return (
  //               <Image style={{
  //                 ...imageStyle,
  //                 tintColor: currentTab?.current == 2 ? themeColors.primary_color : colors.black
  //               }} source={imagePath.icCat} />
  //             )
  //           }}
  //           labelStyle={{ color: currentTab?.current == 2 ? themeColors?.primary_color : colors.black }}
  //           style={{
  //             backgroundColor: currentTab?.current == 2 ? getColorCodeWithOpactiyNumber(
  //               themeColors.primary_color.substr(1),
  //               10,
  //             ) : colors.white
  //           }}
  //         /> */}

  //         <DrawerItem
  //           label={strings.WISHLIST}
  //           onPress={() => onPressWishList(3)} //tabIndex
  //           icon={({ focused }) => {
  //             return (
  //               <Image
  //                 style={{
  //                   ...imageStyle,
  //                   resizeMode: "contain",
  //                   tintColor: themeColors.primary_color,
  //                 }}
  //                 source={imagePath.wishlist2}
  //               />
  //             );
  //           }}
  //           labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
  //         />

  //         <DrawerItem
  //           label={strings.PRIVACY_POLICY}
  //           onPress={() => onPressPrivacyPolicy(1, 4)} //id, tabIndex
  //           icon={({ focused }) => {
  //             return (
  //               <Image
  //                 style={{
  //                   ...imageStyle,
  //                   resizeMode: "contain",
  //                   tintColor: themeColors.primary_color,
  //                 }}
  //                 source={imagePath.icPrivacy}
  //               />
  //             );
  //           }}
  //           labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
  //         />

  //         <DrawerItem
  //           label={strings.TERMS_CONDITIONS}
  //           onPress={() => onPressPrivacyPolicy(2, 5)} //id, tabIndex
  //           icon={({ focused }) => {
  //             return (
  //               <Image
  //                 style={{
  //                   ...imageStyle,
  //                   resizeMode: "contain",
  //                   tintColor: themeColors.primary_color,
  //                 }}
  //                 source={imagePath.icTerms}
  //               />
  //             );
  //           }}
  //           labelStyle={{ color: isDarkMode ? colors.white : colors.black }}
  //         />
  //       </View>

  //       <View
  //         style={{
  //           flex: 0.2,
  //           justifyContent: "flex-end",
  //           paddingBottom: moderateScaleVertical(16),
  //         }}
  //       >
  //         <ButtonComponent
  //           btnText={!!userData?.auth_token ? strings.LOGOUT : strings.LOGIN}
  //           containerStyle={{
  //             backgroundColor: themeColors.primary_color,
  //             marginHorizontal: moderateScale(12),
  //             borderRadius: moderateScale(4),
  //           }}
  //           onPress={onPressLoginLogout}
  //         />
  //       </View>
  //     </SafeAreaView>
  //   </View>
  // );
};
export default React.memo(CustomP2pOnDemandContent);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    paddingVertical: moderateScaleVertical(10),
  },
  iconContainer: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.3,
  },
  profileContainer: {
    paddingVertical: moderateScaleVertical(8),
  },
  profileImage: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    borderWidth: 1.3,
    padding: moderateScale(5),
  },
  profileName: {
    // marginTop: moderateScaleVertical(8),
    fontSize: moderateScale(12),
    fontFamily: "Poppins-Medium",
  },
  viewProfileText:{
    fontSize: moderateScale(8),
    fontFamily: "Poppins-Regular",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(16),
  },
  drawerItemIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    marginRight: moderateScale(10),
  },
  drawerItemText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Regular",
    color: colors.black,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(4),
    alignItems: "center",
    marginHorizontal: moderateScale(12),
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
  },
  drawerItemActive: {
    backgroundColor: colors.lightGray,
  },
  drawerItemInactive: {
    backgroundColor: colors.white,
  },
});
