import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, ToastAndroid } from "react-native";
import TopNav from "../../components/TopNav";


export default function User(){
  return (
    <>
    <View style={Styles.mainContainer}>
    <TopNav text={"HuPro"}/>
    </View>
    </>
  )
};

const Styles = StyleSheet.create({
    mainContainer:{padding:10},
})
