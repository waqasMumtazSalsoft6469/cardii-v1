import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import colors from '../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width
} from '../styles/responsiveSize';
import { MyDarkTheme } from '../styles/theme';
import { tokenConverterPlusCurrencyNumberFormater } from '../utils/commonFunction';
import {
  getImageUrl,
  getScaleTransformationStyle,
  pressInAnimation,
  pressOutAnimation
} from '../utils/helperFunctions';
import { getColorSchema } from '../utils/utils';

let imageHeight = parseInt(moderateScale(100))
let imageWidth = parseInt(width / 3.2)

const ProductsComp = ({ isDiscount, item, imageStyle, onPress = () => { }, numberOfLines = 1 }) => {
  const { themeColors, appStyle, currencies, themeColor, themeToggle, appData } =
    useSelector((state) => state?.initBoot);
  const { additional_preferences, digit_after_decimal } = useSelector(
    (state) => state?.initBoot?.appData?.profile?.preferences,
  );
  const darkthemeusingDevice = getColorSchema();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  const fontFamily = appStyle?.fontSizeData;

  const scaleInAnimated = new Animated.Value(0);

  const {
    translation = [],
    category = {},
    media = [],
    vendor = {},
    variant = [],
  } = item;


  const imageUrl = getImageUrl(
    media[0]?.image?.path?.proxy_url,
    media[0]?.image?.path?.image_path,
    `${imageHeight}/${imageWidth}`,
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        backgroundColor: isDarkMode ? MyDarkTheme.colors.background : colors.white,
        elevation: 1,
        marginVertical: 2,
        borderRadius: moderateScale(5),
        ...getScaleTransformationStyle(scaleInAnimated),
      }}
      onPressIn={() => pressInAnimation(scaleInAnimated)}
      onPressOut={() => pressOutAnimation(scaleInAnimated)}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: imageUrl,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
        }}

        style={{
          height: imageHeight,
          width: imageWidth,
          backgroundColor: isDarkMode ? colors.whiteOpacity22 : colors.white,
          borderTopLeftRadius: moderateScale(5),
          borderTopRightRadius: moderateScale(5),
          ...imageStyle,
        }}
        imageStyle={{
          borderRadius: moderateScale(10),
          backgroundColor: isDarkMode
            ? colors.whiteOpacity15
            : colors.greyColor,
        }}>
        {!!appData?.profile?.preferences?.rating_check && !!item?.averageRating && item?.averageRating !== '0.0' && (
          <View style={styles.hdrRatingTxtView}>
            <Text
              style={{
                ...styles.ratingTxt,
                fontFamily: fontFamily.medium,
              }}>
              {Number(item?.averageRating).toFixed(1)}
            </Text>
            <Image
              style={styles.starImg}
              source={imagePath.star}
              resizeMode="contain"
            />
          </View>
        )}
      </FastImage>
      <View style={{ marginVertical: moderateScaleVertical(6) }}>
        <Text
          numberOfLines={numberOfLines}
          style={{
            fontSize: textScale(12),
            fontFamily: fontFamily.medium,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
            textAlign: 'left',
            lineHeight: moderateScale(16),
            marginLeft: moderateScale(5),
          }}>
          {translation[0]?.title || item?.title || item?.sku}

        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: textScale(11),
            fontFamily: fontFamily.regular,
            marginVertical: moderateScaleVertical(4),
            color: isDarkMode ? MyDarkTheme.colors.text : colors.blackOpacity66,
            textAlign: 'left',
            marginLeft: moderateScale(5),
          }}>
          {vendor?.name}
        </Text>
        {!isDiscount ? (
          <View style={{ flexDirection: 'row', flex: 1, }}>
            {!!category?.category_detail?.translation[0]?.name ? (
              <Text
                numberOfLines={1}
                style={{
                  ...styles.inTextStyle,
                  fontFamily: fontFamily.regular,
                  color: isDarkMode
                    ? MyDarkTheme.colors.text
                    : colors.blackOpacity66,
                  marginLeft: moderateScale(5),
                  flex: 0.4
                }}>
                {category?.category_detail?.translation[0]?.name || category}
              </Text>
            ) : <View style={{
              flex: 0.4
            }} />}
            <View style={{
              flex: 0.6,
              alignItems: "flex-end",
            }}>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontFamily: fontFamily.medium,
                  color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                  marginRight: moderateScale(5),
                }}>

                {tokenConverterPlusCurrencyNumberFormater(
                  variant[0]?.price,
                  digit_after_decimal,
                  additional_preferences,
                  currencies?.primary_currency?.symbol,
                )}
              </Text>
            </View>

          </View>
        ) : (
          <View>
            <Text
              style={{
                ...styles.inTextStyle,
                fontFamily: fontFamily.regular,
                color: isDarkMode
                  ? MyDarkTheme.colors.text
                  : colors.blackOpacity66,
                marginLeft: moderateScale(5),
              }}>
              {strings.IN} {category?.category_detail?.translation[0]?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: moderateScale(5),
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  fontSize: textScale(12),
                  fontFamily: fontFamily.medium,
                  color: colors.green,
                  marginVertical: moderateScaleVertical(8),
                }}>
                {tokenConverterPlusCurrencyNumberFormater(
                  variant[0]?.price,
                  digit_after_decimal,
                  additional_preferences,
                  currencies?.primary_currency?.symbol,
                )}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  textDecorationLine: 'line-through',
                  color: isDarkMode
                    ? MyDarkTheme.colors.text
                    : colors.blackOpacity40,
                  marginLeft: moderateScale(12),
                }}>
                {tokenConverterPlusCurrencyNumberFormater(
                  variant[0]?.price,
                  digit_after_decimal,
                  additional_preferences,
                  currencies?.primary_currency?.symbol,
                )}

              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hdrRatingTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(4),
    alignSelf: 'flex-start',
    borderRadius: moderateScale(2),
    marginTop: moderateScaleVertical(16),
  },
  ratingTxt: {
    textAlign: 'left',
    color: colors.white,
    fontSize: textScale(9),
    textAlign: 'left',
  },
  starImg: {
    tintColor: colors.white,
    marginLeft: 2,
    width: 9,
    height: 9,
  },
  inTextStyle: {
    fontSize: textScale(9),
    width: width / 3,
    textAlign: 'left',
  },
});

export default React.memo(ProductsComp);
