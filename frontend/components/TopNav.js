import { View, Text,StyleSheet } from "react-native";
import { useTheme } from "styled-components";

export default function TopNav({text}) {
    const theme = useTheme();
    const color = theme.textDark;
    const navBg= theme.navBg;
    return (
        <View style={[styles.sectionOne, { backgroundColor: navBg }]}>
            <Text style={[styles.h1, { color }]}>{text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    sectionOne:{marginVertical:10,padding:10,borderRadius:50},
    h1:{fontSize:30, fontWeight:"600"},

})