import React, { Fragment } from "react";
import { Platform, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useSelector } from "react-redux";
import colors from "../styles/colors";
import { moderateScaleVertical, width } from "../styles/responsiveSize";
import { MyDarkTheme } from "../styles/theme";
import { getColorSchema } from "../utils/utils";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";

const CustomBottomTabBar = ({
  state,
  descriptors,
  navigation,
  bottomTabNotify,

  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { themeColors, themeToggle, themeColor, appStyle } = useSelector(
    (state) => state.initBoot
  );
  console.log("themeColors *******>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", themeColors);
  const fontFamily = appStyle?.fontSizeData;

  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  // <BlurView
  //   blurAmount={20}
  //   blurType={isDarkMode ? "dark" : "light"}
  //   reducedTransparencyFallbackColor={colors.white}
  // />;
  return (
    <>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height:
            Platform.OS === "ios" ? 60 + insets.bottom : 70 + insets.bottom,
          width: width,
        }}
      >
        {/* Blur background layer */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
             overflow: "hidden",
            zIndex: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // <--- subtle dark tint
          }}
        >
          <BlurView
            blurAmount={50}
            blurType={isDarkMode ? "dark" : "light"}
            reducedTransparencyFallbackColor={colors.white}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>

        {/* Foreground content on top of blur */}
        <View
          style={{
            flexDirection: "row",
             paddingBottom: insets.bottom,
            paddingTop: 12,
            zIndex: 1,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: moderateScaleVertical(50),
                }}
              >
                {options.tabBarIcon({ focused: isFocused })}
                <Text
                  style={{
                    ...props.labelStyle,
                    color: isFocused
                      ? themeColors.secondary_color_new
                      : themeColors.secondary_color,
                    fontFamily: isFocused
                      ? fontFamily?.bold
                      : fontFamily?.regular,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
  // return (
  //   <LinearGradient
  //     colors={["#252525", "#FFFFFF"]}
  //     locations={[0, 0.7, ]} // 70% black, 30% white
  //     start={{ x: 0, y: 0 }}
  //     end={{ x: 0, y: 1 }}
  //     style={{

  //       height: Platform.OS === "ios" ? 60 + insets.bottom : 70 + insets.bottom,
  //       flexDirection: "row",
  //       paddingBottom: insets.bottom,
  //       paddingTop: 10,
  //       width: width,
  //       // backgroundColor: 'red'
  //     }}
  //   >
  //     {state.routes.map((route, index) => {
  //       const { options } = descriptors[route.key];
  //       const isFocused = state.index === index;
  //       const label =
  //         options.tabBarLabel !== undefined
  //           ? options.tabBarLabel
  //           : options.title !== undefined
  //           ? options.title
  //           : route.name;
  //       const onPress = () => {
  //         const event = navigation.emit({
  //           type: "tabPress",
  //           target: route.key,
  //           canPreventDefault: true,
  //         });

  //         if (!isFocused && !event.defaultPrevented) {
  //           navigation.navigate(route.name);
  //         }
  //       };

  //       return (
  //         <Fragment key={route.name}>
  //           <TouchableOpacity
  //             accessibilityRole="button"
  //             accessibilityStates={isFocused ? ["selected"] : []}
  //             accessibilityLabel={options.tabBarAccessibilityLabel}
  //             testID={options.tabBarTestID}
  //             onPress={onPress}
  //             // onLongPress={onLongPress}
  //             style={{
  //               flex: 1,
  //               alignItems: "center",
  //               justifyContent: "space-between",
  //               height: moderateScaleVertical(50),
  //             }}
  //           >
  //             {options.tabBarIcon({ focused: isFocused })}
  //             <Text
  //               style={{
  //                 ...props.labelStyle,
  //                 color: isFocused
  //                   ? themeColors.secondary_color_new
  //                   : isDarkMode
  //                   ? colors.white
  //                   : colors.tabBarGrey,
  //                 // opacity: isFocused ? 1 : 0.6,
  //                 fontFamily: isFocused
  //                   ? fontFamily?.bold
  //                   : fontFamily?.regular,
  //               }}
  //             >
  //               {label}
  //             </Text>
  //           </TouchableOpacity>
  //         </Fragment>
  //       );
  //     })}
  //   </LinearGradient>
  // );
  // return (
  //   <Shadow
  //     style={{
  //       height: Platform.OS === 'ios' ? 60 + insets.bottom : 70 + insets.bottom,
  //       flexDirection: 'row',
  //       paddingBottom: insets.bottom,
  //       paddingTop: 10,
  //       width: width,
  //      // backgroundColor: 'red'
  //       backgroundColor: isDarkMode
  //         ? MyDarkTheme?.colors?.lightDark
  //         : colors.white,
  //     }}>
  //     {state.routes.map((route, index) => {
  //       const { options } = descriptors[route.key];
  //       const isFocused = state.index === index;
  //       const label =
  //         options.tabBarLabel !== undefined
  //           ? options.tabBarLabel
  //           : options.title !== undefined
  //             ? options.title
  //             : route.name;
  //       const onPress = () => {
  //         const event = navigation.emit({
  //           type: 'tabPress',
  //           target: route.key,
  //           canPreventDefault: true,
  //         });

  //         if (!isFocused && !event.defaultPrevented) {
  //           navigation.navigate(route.name);
  //         }
  //       };

  //       return (
  //         <Fragment key={route.name}>
  //           <TouchableOpacity
  //             accessibilityRole="button"
  //             accessibilityStates={isFocused ? ['selected'] : []}
  //             accessibilityLabel={options.tabBarAccessibilityLabel}
  //             testID={options.tabBarTestID}
  //             onPress={onPress}
  //             // onLongPress={onLongPress}
  //             style={{
  //               flex: 1,
  //               alignItems: 'center',
  //               justifyContent: 'space-between',
  //               height: moderateScaleVertical(50),
  //             }}>
  //             {options.tabBarIcon({ focused: isFocused })}
  //             <Text
  //               style={{
  //                 ...props.labelStyle,
  //                 color: isFocused
  //                   ? themeColors.primary_color
  //                   : isDarkMode
  //                     ? colors.white
  //                     : colors.tabBarGrey,
  //                 // opacity: isFocused ? 1 : 0.6,
  //                 fontFamily: isFocused
  //                   ? fontFamily?.bold
  //                   : fontFamily?.regular,
  //               }}>
  //               {label}
  //             </Text>
  //           </TouchableOpacity>
  //         </Fragment>
  //       );
  //     })}
  //   </Shadow>
  // );
};
export default React.memo(CustomBottomTabBar);
