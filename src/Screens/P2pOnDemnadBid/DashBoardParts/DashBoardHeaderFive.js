import React, { useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
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
}) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const videoRef = useRef(null);

  const { appData, themeColors, appStyle, themeColor, themeToggle } =
    useSelector((state) => state?.initBoot);
  const { userData } = useSelector((state) => state?.auth);

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

  const renderItems = () => (
    <>
      <View style={[styles.child, { backgroundColor: "tomato" }]}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "thistle" }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "skyblue" }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Text style={styles.text}>4</Text>
      </View>
    </>
  );

  return (
    <View
      style={{
        // paddingHorizontal: moderateScale(16),
        backgroundColor: "red",
        // paddingTop: top,
        height: "35%",
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={{ position: "absolute", zIndex: 999, top: top, left: 15, right:15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={imagePath.icMenuIcon}
            style={{
              width: moderateScale(30),
              height: moderateScale(30),
            }}
            tintColor={colors.white}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={onPressAddress}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.locationIcon}
              source={imagePath.ic_map}
              resizeMode="contain"
            />
            <Text
              numberOfLines={1}
              style={{
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                fontFamily: fontFamily.regular,
                maxWidth: moderateScale(180),
                fontSize: textScale(12),
              }}
            >
              {currentLocation?.address || location?.address}
            </Text>

            <Image source={imagePath.ic_down_arrow} />
          </TouchableOpacity>

          <ButtonImage
            onPress={() =>
              !!userData?.auth_token
                ? navigation.navigate(navigationStrings.NOTIFICATION)
                : actions.setAppSessionData("on_login")
            }
            image={imagePath.ic_notification}
            imgStyle={{
              tintColor: isDarkMode ? MyDarkTheme.colors.text : colors.black,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: moderateScaleVertical(12),
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              height: moderateScale(48),
              borderRadius: moderateScale(8),
              backgroundColor: isDarkMode
                ? MyDarkTheme.colors.lightDark
                : colors.white,
              borderWidth: moderateScale(1),
              borderColor: isDarkMode
                ? MyDarkTheme.colors.lightDark
                : colors.borderColor,
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: moderateScale(8),
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
              }
            >
              <Image
                style={{
                  tintColor: isDarkMode
                    ? MyDarkTheme.colors.text
                    : colors.textGreyH,
                }}
                source={imagePath.icSearchNew}
              />
            </TouchableOpacity>
          </View>
        </View>
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
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={50}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.1)"
          />
        </View>
        <View style={[styles.child]}>
          <Video
            ref={videoRef}
            source={videos.video2}
            // onLoad={(evnt) => setisVideoLoaded(true)}
            // onBuffer={(isBuffering) => setBuffering(isBuffering)}
            // onEnd={() => videoRef?.current.seek(0)}
            // paused={paused}
            style={{ height: "100%", width: "100%" }}
            resizeMode={"cover"}
          />
          {/* Blur overlay */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
          />
        </View>
        <View style={[styles.child]}>
          <Video
            ref={videoRef}
            source={videos.video3}
            // onLoad={(evnt) => setisVideoLoaded(true)}
            // onBuffer={(isBuffering) => setBuffering(isBuffering)}
            // onEnd={() => videoRef?.current.seek(0)}
            // paused={paused}
            style={{ height: "100%", width: "100%" }}
            resizeMode={"cover"}
          />
          {/* Blur overlay */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='dark'
            blurAmount={40}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
          />
        </View>
      </Swiper>
    </View>
  );
}
