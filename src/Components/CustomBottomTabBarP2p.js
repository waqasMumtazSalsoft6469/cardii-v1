import React, { Fragment } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import { useSelector } from 'react-redux';
import colors from '../styles/colors';
import { moderateScaleVertical, width } from '../styles/responsiveSize';
import { MyDarkTheme } from '../styles/theme';
import { getColorSchema } from '../utils/utils';

const CustomBottomTabBar = ({
  state,
  descriptors,
  navigation,
  bottomTabNotify,

  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { themeColors, themeToggle, themeColor, appStyle } = useSelector(
    (state) => state.initBoot,
  );
  const fontFamily = appStyle?.fontSizeData;

  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  return (
    <Shadow
      style={{
        height: Platform.OS === 'ios' ? 60 + insets.bottom : 70 + insets.bottom,
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        paddingTop: 10,
        width: width,
        backgroundColor: isDarkMode
          ? MyDarkTheme?.colors?.lightDark
          : colors.white,
      }}>
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
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Fragment key={route.name}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                height: moderateScaleVertical(50),
              }}>
              {options.tabBarIcon({ focused: isFocused })}
              <Text
                style={{
                  ...props.labelStyle,
                  color: isFocused
                    ? themeColors.primary_color
                    : isDarkMode
                      ? colors.white
                      : colors.tabBarGrey,
                  // opacity: isFocused ? 1 : 0.6,
                  fontFamily: isFocused
                    ? fontFamily?.bold
                    : fontFamily?.regular,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </Shadow>
  );
};
export default React.memo(CustomBottomTabBar);
