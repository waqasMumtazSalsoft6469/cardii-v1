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

const { width, height } = Dimensions.get("window");

export default function DashBoardHeaderFive({
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
  onPressMenu
}) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const videoRef = useRef(null);

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
    <View
      style={{
        backgroundColor: "red",
        height: "35%",
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={{
          position: "absolute",
          zIndex: 999,
          top: top,
          left: 15,
          right: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity 
           // onPress={() => navigation.openDrawer()}
            onPress={onPressMenu}
            activeOpacity={0.7}
            >
              <Image
                source={imagePath.icMenuIcon}
                style={{
                  width: moderateScale(28),
                  height: moderateScale(28),
                }}
                tintColor={colors.white}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{ marginLeft: moderateScale(12) }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.white,
                    fontFamily: fontFamily.bold,
                    fontSize: textScale(13),
                  }}
                >{`Hi, ${userData?.name}!`}</Text>
                <Image
                  style={styles.locationIcon}
                  source={imagePath.handHi}
                  resizeMode="contain"
                />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.regular,
                  fontSize: textScale(10),
                }}
              >
                Energy Solutions Tailored For You!
              </Text>
            </View>
          </View>

          <ButtonImage
            onPress={() =>
              !!userData?.auth_token
                ? navigation.navigate(navigationStrings.NOTIFICATION)
                : actions.setAppSessionData("on_login")
            }
            image={imagePath.ic_notification}
            imgStyle={{
              tintColor: colors.white,
            }}
          />
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
          <View
            style={{
              height: moderateScale(35),
              borderRadius: moderateScale(20),
              flex: 1,
              overflow: "hidden",
              marginRight: moderateScale(20),
              // justifyContent:'center'
            }}
          >
            <BlurView
              blurType="light"
              blurAmount={15}
              //  reducedTransparencyFallbackColor="rgba(255,255,255,0.3)"
              style={{
                height: moderateScale(34),
                marginHorizontal: moderateScale(15),
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      tintColor: colors?.white,
                    }}
                    source={imagePath.icSearchNew}
                  />
                  <Text
                    style={{
                      marginLeft: moderateScale(10),
                      color: colors?.white,
                    }}
                  >
                    Search here...
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
          </View>
          <TouchableOpacity
            style={{
              height: moderateScale(35),
              width: moderateScale(35),
              borderRadius: moderateScale(17.5),
              //  backgroundColor: "rgba(0,0,0,0.3)",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <BlurView
              blurType="light"
              blurAmount={15}
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                alignItems: "center",
                justifyContent: "center",
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
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={{ marginTop: moderateScaleVertical(12) }}>
          <View>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: fontFamily.bold,
                color: colors.white,
                fontSize: textScale(12),
                lineHeight: 21,
              }}
            >
              Reliable Rides,{"\n"}Anytime, Anywhere
            </Text>
          </View>
        </View>
        {/* Button  */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.white,
            padding: moderateScale(8),
            borderRadius: moderateScale(4),
            width: "30%",
            alignItems: "center",
            marginTop: moderateScaleVertical(12),
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: textScale(12), color: colors.white }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      <Swiper>
        <View style={[styles.child]}>
          <Video
            ref={videoRef}
            source={videos.video1}
            // onLoad={(evnt) => setisVideoLoaded(true)}
            // onBuffer={(isBuffering) => setBuffering(isBuffering)}
            // onEnd={() => videoRef?.current.seek(0)}
            // paused={paused}
            style={StyleSheet.absoluteFillObject}
            resizeMode={"cover"}
          />
          {/* Blur overlay */}
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%", // adjust to fit your top card height
            }}
            blurType="dark"
            blurAmount={50}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.1)"
          />
        </View>
        <View style={[styles.child]}>
          <Video
            ref={videoRef}
            source={videos.video2}
            style={{ height: "100%", width: "100%" }}
            resizeMode={"cover"}
          />
          {/* Blur overlay */}
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%", // adjust to fit your top card height
            }}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
          />
        </View>
        <View style={[styles.child]}>
          <Video
            ref={videoRef}
            source={videos.video3}
            style={{ height: "100%", width: "100%" }}
            resizeMode={"cover"}
          />
          {/* Blur overlay */}
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%", // adjust to fit your top card height
            }}
            blurType="dark"
            blurAmount={40}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
          />
        </View>
      </Swiper>
    </View>
  );
}
