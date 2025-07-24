import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import DashBoardHeaderFiveV1 from "../DashBoardParts/DashBoardHeaderFiveV1";
import imagePath from "../../../constants/imagePath";
import AntDesign from "react-native-vector-icons/AntDesign";
import { moderateScale } from "../../../styles/responsiveSize";

const CAR_DATA = [
  {
    id: "1",
    image: imagePath.ferrari, // Use your image path
    title: "Jaguar XE L P250",
    rating: 4.8,
    reviews: "2,436",
    price: "$1,800/day",
    tags: ["For Rent", "For Sale"],
  },
];

const CarCard = ({ item }) => (
  <View style={styles.card}>
    {/* Left Image with Tags */}
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.tagRow}>
        {item.tags.map((tag, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: tag === "For Rent" ? "#FF3B30" : "#007AFF" , left: index == 1 ? 3 : 0, paddingHorizontal: 10},
            ]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>

    {/* Right Content */}
    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.ratingRow}>
        <AntDesign name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
      </View>

      <Text style={styles.price}>{item.price}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>More Details</Text>
        <AntDesign name="arrowright" size={16} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
);
const RentalCarsList = () => {
  return (
    <>
      <DashBoardHeaderFiveV1 menu={true} title="Rental Cars" />
      <View style={{ flex: 1 }}>
        <FlatList
          data={CAR_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CarCard item={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </>
  );
};

export default RentalCarsList;

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
     // justifyContent:'space-evenly',
      backgroundColor: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 3,
      marginBottom: 16,
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    imageContainer: {
      width: moderateScale(120),
      height: moderateScale(110),
      marginRight: 12,
      position: 'relative',
    //   backgroundColor: 'red'
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    tagRow: {
      position: 'absolute',
      flexDirection: 'row',
      top: 6,
     // left: 6,
      gap: 6,
    },
    tag: {
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    tagText: {
      fontSize: 10,
      color: '#fff',
      fontWeight: '600',
    },
    content: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    title: {
      fontWeight: '700',
      fontSize: 14,
      color: '#000',
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    ratingText: {
      marginLeft: 4,
      fontWeight: '600',
      fontSize: 12,
      color: '#000',
    },
    reviewsText: {
      marginLeft: 6,
      fontSize: 12,
      color: '#888',
    },
    price: {
      fontWeight: '600',
      color: '#000',
      fontSize: 13,
      marginBottom: 6,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
     // backgroundColor: '#F2F2F2',
      paddingHorizontal: 25,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth:2,
      borderColor: '#F2F2F2',
      alignSelf: 'center',

    },
    buttonText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
      marginRight: 4,
    },
  });
