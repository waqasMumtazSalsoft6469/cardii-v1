import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import colors from '../../styles/colors';

// const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const Swiper = ({children}) => (
  <View style={styles.container}>
    {/* <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={colors}
      renderItem={({ item }) => (
        <View style={[styles.child, { backgroundColor: item }]}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
    /> */}
    <SwiperFlatList 
    autoplay 
    autoplayDelay={7} 
    autoplayLoop
    index={0} 
    showPagination
    paginationActiveColor={colors?.secondaryColor}
     >
      {children}
    </SwiperFlatList>
  </View>
);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default Swiper;