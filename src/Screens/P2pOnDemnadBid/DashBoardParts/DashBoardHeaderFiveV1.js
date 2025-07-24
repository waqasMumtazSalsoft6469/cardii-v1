import React, { useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import imagePath from "../../../constants/imagePath";
import navigationStrings from "../../../navigation/navigationStrings";
import colors from "../../../styles/colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../../styles/responsiveSize";
import { getImageUrl } from "../../../utils/helperFunctions";
import stylesFunc from "../styles";

import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import ButtonImage from "../../../Components/ImageComp";
import actions from "../../../redux/actions";
import { MyDarkTheme } from "../../../styles/theme";
import { getColorSchema } from "../../../utils/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "../../../Components/Swiper";
import Video from "react-native-video";
import { videos } from "../../../assets/videos";
import { BlurView } from "@react-native-community/blur";
import CustomDrawerModal from "../../../Components/CustomDrawerModal";

const { width, height } = Dimensions.get("window");

export default function DashBoardHeaderFiveV1({
  // navigation = {},
  location = [],
  selcetedToggle,
  toggleData,
  isLoading = false,
  isLoadingB = false,
  _onVoiceListen = () => {},
  isVoiceRecord = false,
  onPressCenterIcon = () => {},
  _onVoiceStop = () => {},
  showAboveView = true,
  currentLocation,
  nearestLoc,
  currentLoc,
  onPressAddress = () => {},
  onPressMenu,
  menu = false,
  back = false,
  title = "",
  onPressBack = () => {},
}) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const modalRef = useRef();

  const { appData, themeColors, appStyle, themeColor, themeToggle } =
    useSelector((state) => state?.initBoot);
  const { userData } = useSelector((state) => state?.auth);
  // console.log("User Data: *****>>>>>>>>>>>>>>>", userData);

  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;

  const profileInfo = appData?.profile;
  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesFunc({ themeColors, fontFamily });

  const imageURI = getImageUrl(
    isDarkMode
      ? profileInfo?.dark_logo?.image_fit
      : profileInfo?.logo?.image_fit,
    isDarkMode
      ? profileInfo?.dark_logo?.image_path
      : profileInfo?.logo?.image_path,
    "200/400"
  );

  return (
    <>
      <View
        style={{
          //position: "absolute",
         // zIndex: 999,
          marginTop: top,
          marginHorizontal: moderateScale(15),
        //   left: 15,
        //   right: 15,
         // height: '20%',
         // backgroundColor: 'red'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {menu ? (
            <TouchableOpacity
              // onPress={() => navigation.openDrawer()}
              onPress={() => modalRef.current?.openDrawer()}
              activeOpacity={0.7}
            >
              <Image
                source={imagePath.icMenuIcon}
                style={{
                  width: moderateScale(28),
                  height: moderateScale(28),
                }}
                // tintColor={colors.white}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // onPress={() => navigation.openDrawer()}
              onPress={onPressBack ? onPressBack : () => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Image
                source={imagePath.icBackb}
                style={{
                  width: moderateScale(22),
                  height: moderateScale(22),
                }}
                // tintColor={colors.white}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          <View>
            <Text
              numberOfLines={1}
              style={{
                color: isDarkMode ? colors.white : colors.black,
                fontFamily: fontFamily.bold,
                fontSize: textScale(13),
              }}
            >{`${title}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              !!userData?.auth_token
                ? navigation.navigate(navigationStrings.NOTIFICATION)
                : actions.setAppSessionData("on_login")
            }
            activeOpacity={0.7}
          >
            <Image
              source={imagePath.notificaton}
              style={{
                height: moderateScale(22),
                width: moderateScale(22),
                resizeMode: "contain",
                tintColor: isDarkMode ? colors.white : colors.black,
              }}
            />
          </TouchableOpacity>

        </View>
        {/* Search Container */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: moderateScaleVertical(14),
          }}
        >
          <TouchableOpacity
            style={{
              height: moderateScale(35),
              borderRadius: moderateScale(20),
              flex: 1,
              //overflow: "hidden",
              marginRight: moderateScale(20),
              borderWidth: 0.4,
              borderColor: isDarkMode ? colors.white : colors.greyA,
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              // justifyContent:'center'
            }}
            onPress={() =>
              navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
            }
          >
            <Image
              style={{
                tintColor: isDarkMode ? colors?.white : colors?.black,
              }}
              source={imagePath.icSearchNew}
            />
            <Text
              style={{
                marginLeft: moderateScale(10),
                color: colors?.greyA,
              }}
            >
              Search here...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: moderateScale(35),
              width: moderateScale(35),
              borderRadius: moderateScale(17.5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors?.secondaryColor,
            }}
          >
            <Image
              source={imagePath.filter2}
              style={{
                height: moderateScale(18),
                width: moderateScale(18),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CustomDrawerModal ref={modalRef} />
    </>
  );
}
