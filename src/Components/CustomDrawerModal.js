import React, {
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
  } from "react";
  import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
  } from "react-native";
  import { BlurView } from "@react-native-community/blur";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useSelector } from "react-redux";
  
  import colors from "../styles/colors";
  import { moderateScale } from "../styles/responsiveSize";
  import { MyDarkTheme } from "../styles/theme";
  import CustomP2pOnDemandContent from "./CustomP2pOnDemandContent";
  import imagePath from "../constants/imagePath";
  import { getColorSchema } from "../utils/utils";
  
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  
  const CustomDrawerModal = forwardRef((props, ref) => {
    const {
      themeColor,
      themeToggle,
    } = useSelector((state) => state?.initBoot);
  
    const darkthemeusingDevice = getColorSchema();
    const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  
    const [isMenu, setIsMenu] = useState(false);
    const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  
    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      openDrawer: () => {
        slideAnim.setValue(-SCREEN_WIDTH);
        setIsMenu(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
      closeDrawer: () => {
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setIsMenu(false));
      },
    }));
  
    return (
      <Modal
        visible={isMenu}
        animationType="none"
        statusBarTranslucent={true}
        // transparent={true}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Animated.View
          style={[
            styles.drawerContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <BlurView
            blurAmount={20}
            blurType={isDarkMode ? "dark" : "light"}
            style={StyleSheet.absoluteFill}
            reducedTransparencyFallbackColor={colors.white}
          />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
              <View style={{ marginHorizontal: moderateScale(8) }}>
                <TouchableOpacity
                  onPress={() => {
                    Animated.timing(slideAnim, {
                      toValue: -SCREEN_WIDTH,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => setIsMenu(false));
                  }}
                  style={styles.closeButton}
                >
                  <Image
                    source={imagePath.icBackb}
                    style={styles.closeIcon}
                    tintColor={isDarkMode ? colors.white : colors.grayOpacity51}
                  />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={{ margin: moderateScale(20) }}>
                    <CustomP2pOnDemandContent />
                  </View>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>
    );
  });
  
  export default CustomDrawerModal;
  
  const styles = StyleSheet.create({
    drawerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: "transparent",
    },
    innerContainer: {
      flex: 1,
      height: SCREEN_HEIGHT,
    },
    closeButton: {
      width: moderateScale(32),
      height: moderateScale(30),
      alignItems: "center",
      justifyContent: "center",
    },
    closeIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
  });
  