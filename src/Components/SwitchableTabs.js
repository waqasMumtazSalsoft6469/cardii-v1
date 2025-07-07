import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../styles/colors';
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';
import { MyDarkTheme } from '../styles/theme';
import { getColorSchema } from '../utils/utils';
import ButtonWithLoader from './ButtonWithLoader';





const SwitchableTabs = ({
    tabsData = [],
    onChangeTab = () => { },
    selectedTab,
    mainContainerStyle = {},
}) => {

    const {
        appData,
        currencies,
        languages,
        appStyle,
        themeColors,
        themeToggle,
        themeColor
    } = useSelector(state => state?.initBoot);
    const darkthemeusingDevice = getColorSchema();
    const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;

    const fontFamily = appStyle?.fontSizeData;


    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: moderateScale(16),
                ...mainContainerStyle,
            }}>
            {tabsData.map((item, index) => (
                <ButtonWithLoader
                    key={String(item.id)}
                    btnText={item?.title}
                    onPress={() => onChangeTab(item)}
                    btnTextStyle={{
                        color:
                            selectedTab?.id === item?.id ? colors.white : isDarkMode ? MyDarkTheme.colors.text : colors.black,
                        fontSize: textScale(13),
                        fontFamily: fontFamily?.regular,
                        textTransform: "none"
                    }}
                    btnStyle={{
                        flex: 0.5,
                        backgroundColor:
                            selectedTab?.id === item?.id
                                ? themeColors?.primary_color
                                : isDarkMode ? MyDarkTheme.colors.background : colors.white,
                        borderWidth: 0,
                        height: moderateScaleVertical(32),
                        borderRadius: moderateScale(8),
                        marginTop: 0
                    }}
                />
            ))}
        </View>
    );
};

export default React.memo(SwitchableTabs);

const styles = StyleSheet.create({});
