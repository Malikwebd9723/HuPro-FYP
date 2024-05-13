import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, ToastAndroid } from "react-native";
import TopNav from "../../components/TopNav";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/States";
import { useTheme } from "styled-components";


export default function User(){
  const context = useContext(Context);
  const {getProfileData, profileData, handleGetNotification, notificationData,getLocation,location} = context;
  const theme = useTheme();
  const color = theme.text;
  const backgroundColor = theme.bg;
  const boxbg = theme.boxBg;
  const navBg = theme.navBg;
  const colorDark = theme.textDark;

  const [load, setLoad] =useState(false)
  useEffect(()=>{
    handleGetNotification();
    getLocation();
    const getId = async()=>{
      const userId = await AsyncStorage.getItem("user");
      getProfileData(userId);
  }
  getId();
  console.log(location);
  setLoad(true)
  },[])
  return (
    <>
    <View style={[Styles.mainContainer,{backgroundColor}]}>
    <TopNav text={"HuPro"}/>
    <ScrollView>
      <Text style={[Styles.name,{color}]}>Greetings "{profileData.fullname}"</Text>
    </ScrollView>
    </View>
    </>
  )
};

const Styles = StyleSheet.create({
    mainContainer:{padding:10, flex:1},
    name:{fontSize:20, paddingHorizontal:10},
})
