import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';

export default ({fontFamily}) => {
  const commonStyles = commonStylesFunc({fontFamily});
  const styles = StyleSheet.create({
    scrollviewHorizontal: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: moderateScaleVertical(50),
      flex: undefined,
      borderColor: colors.borderLight,
    },
    headerText: {
      ...commonStyles.mediumFont14,
      marginRight: moderateScale(20),
      alignSelf: 'center',
    },
    packingBoxStyle: {
      height: moderateScaleVertical(120),
      borderRadius: moderateScaleVertical(13),
      borderWidth: 2,
      // justifyContent: 'center',
      padding: 5,
      marginVertical: 5,
    },
    caseOnDeliveryView: {
      // height: moderateScaleVertical(60),
      padding: moderateScaleVertical(18),
      borderRadius: moderateScaleVertical(13),
      borderWidth: 2,
      borderColor: colors.borderLight,
      flexDirection: 'row',
      marginVertical: 5,
      marginTop: moderateScaleVertical(15),
    },
    useNewCartView: {
      // height: moderateScaleVertical(60),
      padding: moderateScaleVertical(10),
      borderRadius: moderateScaleVertical(13),
      borderWidth: 2,
      borderColor: colors.borderLight,
      flexDirection: 'row',
      marginVertical: 5,
      // position:'absolute',
      // bottom:0,
      marginHorizontal: moderateScaleVertical(20),
      marginTop: moderateScaleVertical(15),
    },
    useNewCartText: {
      fontFamily: fontFamily.medium,
      color: colors.walletTextD,
      marginLeft: moderateScaleVertical(100),
      fontSize: moderateScaleVertical(14),
    },
    caseOnDeliveryText: {
      marginHorizontal: moderateScaleVertical(10),
      fontFamily: fontFamily.bold,
    },
    price: {
      color: colors.textGrey,
      fontFamily: fontFamily.regular,
      fontSize: textScale(14),
    },
    priceItemLabel: {
      color: colors.textGreyB,
      fontFamily: fontFamily.regular,
      fontSize: textScale(13),
      marginTop: moderateScaleVertical(10),
    },
    dropOff: {
      color: colors.textGreyB,
      fontFamily: fontFamily.regular,
      fontSize: textScale(14),
      marginTop: moderateScaleVertical(40),
    },
    dots: {
      width: 4,
      height: 4,
      backgroundColor: 'grey',
      borderRadius: 50,
      marginVertical: 3,
      marginLeft: 4,
    },
    priceItemLabel2: {
      color: colors.textGrey,
      fontFamily: fontFamily.bold,
      fontSize: textScale(14),
    },
    totalPayableView: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(20),
      paddingVertical: moderateScaleVertical(60),

      justifyContent: 'center',
    },
    totalPayableText: {
      fontFamily: fontFamily.bold,
      fontSize: moderateScale(14),
      marginLeft: moderateScale(5),
      marginVertical: moderateScaleVertical(2),
    },
    totalPayableValue: {
      fontFamily: fontFamily.bold,
      fontSize: moderateScale(22),
      marginVertical: moderateScaleVertical(2),
    },
    allIncludedText: {
      color: colors.walletTextD,
      fontFamily: fontFamily.regular,
      marginVertical: moderateScaleVertical(2),
    },
    cardImageView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: moderateScaleVertical(10),
      marginTop: moderateScaleVertical(5),
    },
    masterCardLogo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginRight: moderateScaleVertical(10),
    },
  });
  return styles;
};
