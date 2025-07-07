import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import { width, height } from '../../../styles/responsiveSize';

export default ({ themeColor, toggleTheme, fontFamily }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: !!themeColor ? colors.black : colors.whiteOpacity22,
      paddingBottom: moderateScaleVertical(50)
    },
    btn: {
      width: 100,
      height: moderateScale(30),
      borderRadius: 6,
    },
    view: {
      backgroundColor: colors.white,
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(6),
      paddingBottom: moderateScale(10),
      backgroundColor: !!themeColor ? colors.blackOpacity10 : colors.white,
    },
    view1: {
      backgroundColor: !!themeColor ? colors.blackOpacity10 : colors.white,
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(18),
      marginVertical: moderateScale(12),
    },
    view2: {
      flexDirection: 'row',
      marginVertical: moderateScaleVertical(18),
      alignItems: 'center',
      backgroundColor: !!themeColor ? colors.blackOpacity10 : colors.white,
    },
    txt1: {
      color: !!themeColor ? colors.white : colors.black,
      fontFamily: fontFamily.medium,
      fontSize: textScale(18),
      letterSpacing: 0.5,
    },
    txt2: {
      color: !!themeColor ? colors.white : colors.blackOpacity70,
      fontFamily: fontFamily.regular,
      marginVertical: moderateScale(2),
      fontSize: textScale(12),
    },
    btn1: {
      width: width / 2.5,
      height: moderateScale(48),
      borderRadius: moderateScale(12),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: '#FC7049',
    },
    btn2: {
      width: width / 2.5,
      height: moderateScale(48),
      borderRadius: 12,
    },
    view3: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: moderateScaleVertical(16),
      justifyContent: "space-between"
    },
    chatBtn: {
      fontFamily: fontFamily.regular,
      marginLeft: moderateScale(8),
    },
    imageContainer: {
      // flex: 1,
      // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    item: {
      width: width,

      flex: 1,
      backgroundColor: 'white',
      // borderRadius:moderateScale(8),
      // marginBottom:100
    },
    pagination: {
      flexDirection: 'row',
      position: 'relative',
      bottom: 18,
      justifyContent: 'center',
    },
    dotStyle: {
      backgroundColor: colors.blackOpacity43,
      height: 8,
      width: 8,
      borderRadius: 20,
      marginTop: moderateScale(8),
    },
    back: { position: 'absolute', top: 32, height: 41, justifyContent: "space-between", alignItems: 'center', width: width - moderateScale(16), flexDirection: "row" },
    heart: { position: 'absolute', right: 18, top: 42 },
    leftRightBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateTxt: {
      fontFamily: fontFamily?.medium,
      fontSize: textScale(13),
      color: colors.textGreyM,
      flex: 0.5,
      // backgroundColor: colors.textGrey
    },
    dateBox: {
      padding: moderateScale(12),

      marginHorizontal: moderateScale(16),
      marginTop: moderateScaleVertical(12),
      borderRadius: moderateScale(4),
      borderWidth: 1,
      borderColor: colors.borderColorE,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    customMarker: {
      alignItems: 'center',
      justifyContent: "center",
      height: moderateScaleVertical(24),
      backgroundColor: colors.white,
      width: moderateScale(50),
      borderRadius: moderateScale(22),
    },
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScaleVertical(8),
      justifyContent: "space-between",
      paddingHorizontal: moderateScale(20)
    },
    priceBtn: {
      borderWidth: 1,
      borderRadius: moderateScale(8),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: moderateScaleVertical(24),
      flex: 0.3,

    },
    priceType: {
      fontFamily: fontFamily.regular,
      fontSize: textScale(14)
    },
    price: {
      fontFamily: fontFamily?.medium,
      marginTop: moderateScaleVertical(6),
    }
  });
  // export default styles;
  return styles;
};
