import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { UIActivityIndicator } from 'react-native-indicators';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { moderateScale, width } from '../styles/responsiveSize';
import { getImageUrl } from '../utils/helperFunctions';

const Banner2 = ({
  imagestyle = {},
  // slider1ActiveSlide = 0,
  bannerData = [],
  dotStyle = {},
  bannerRef,
  cardViewStyle = {},
  sliderWidth = width - 20,
  itemWidth = width - 20,
  onSnapToItem,
  pagination = true,
  resizeMode = 'cover',
  setActiveState = () => {},
  onPress = () => {},
  childView = null,
  showLightbox = false,
  BackgroundImageStyle = {},
  autoPlay = true,
}) => {
  const {themeColors} = useSelector((state) => state?.initBoot);

  const [state, setState] = useState({
    slider1ActiveSlide: 0,
    showLightboxView: false,
    imageLoader: true,
  });
  const updateState = (data) => setState((state) => ({...state, ...data}));
  const {slider1ActiveSlide, showLightboxView} = state;
  const setSnapState = (index) => {
    updateState({slider1ActiveSlide: index});
    setActiveState(index);
  };
  const bannerDataImages = ({item, index}) => {
    console.log("itemitemitemitem",item)
    const imageUrl = item?.image?.path
      ? getImageUrl(
          item.image.path.proxy_url,
          item.image.path.image_path,
          '800/800',
        )
      : getImageUrl(item.image.proxy_url, item.image.image_path, '800/800');

    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.imageStyle, imagestyle]}
          onPress={() => onPress(item)}>
          {/* <Lightbox
            underlayColor={'black'}
            renderContent={() => renderCarousel(imageUrl)}> */}

          <FastImage
            source={{
              uri: imageUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            //  onLoadStart={()=>}
            onLoadEnd={() => updateState({imageLoader: false})}
            style={{
              height: 800,
              width: 800,
              ...BackgroundImageStyle,
            }}
            imageStyle={imagestyle}
            resizeMode={resizeMode}>
            {!!state.imageLoader && (
              <UIActivityIndicator
                color={themeColors.primary_color}
                size={40}
              />
            )}
            {childView}
          </FastImage>

          {/* </Lightbox> */}

          {pagination && (
            <View style={{justifyContent: 'flex-end', height: 200}}>
              <Pagination
                dotsLength={bannerData.length}
                activeDotIndex={slider1ActiveSlide}
                containerStyle={{paddingTop: 5}}
                dotColor={'grey'}
                dotStyle={[styles.dotStyle, dotStyle]}
                inactiveDotColor={'black'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
              />
            </View>
          )}
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={[styles.cardViewStyle, cardViewStyle]}>
      <Carousel
        ref={bannerRef}
        data={bannerData}
        renderItem={bannerDataImages}
        autoplay={autoPlay}
        loop={true}
        autoplayInterval={3000}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={(index) => setSnapState(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // height: 180,
    // width: width - 20,
  },
  dotStyle: {height: 12, width: 12, borderRadius: 12 / 2},
  cardViewStyle: {
    alignItems: 'center',
    height: 200,
    width: width - 20,
    marginHorizontal: moderateScale(10),
    overflow: 'visible',

    // marginRight: 20
  },
});

export default React.memo(Banner2);
