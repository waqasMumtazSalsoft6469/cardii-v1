import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../styles/colors';
import { moderateScale } from '../styles/responsiveSize';
import { getColorSchema } from '../utils/utils';

const AutoUpLabelTxtInput = ({
  onChangeText = () => {},
  containerStyle = {},
  value = '',
  label = '',
  keyboardType = '',
  autoCapitalize = '',
  secureTextEntry = false,
  txtInputStyle = {},
  undnerlinecolor = colors.transparent,
}) => {
  const theme = useSelector((state) => state?.initBoot?.themeColor);
  const toggleTheme = useSelector((state) => state?.initBoot?.themeToggle);
  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;

  console.log(secureTextEntry, 'secureTextEntry');
  const {themeColors} = useSelector((state) => state?.initBoot);
  return (
    <View
      style={{
        borderRadius: moderateScale(15),
        overflow: 'hidden',
        ...containerStyle,
      }}>
      <TextInput
        label={label}
        secureTextEntry={secureTextEntry}
        underlineColor={undnerlinecolor}
        selectionColor={isDarkMode ? themeColors.primary_color : colors.black}
        keyboardType={keyboardType}
        value={value}
        multiline={false}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: colors.textGreyK,
          height: moderateScale(60),
          // borderBottomWidth: StyleSheet.hairlineWidth,
          ...txtInputStyle,
        }}
        theme={{colors: {primary: themeColors.primary_color}}}
        onChangeText={onChangeText}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({});
export default React.memo(AutoUpLabelTxtInput);
