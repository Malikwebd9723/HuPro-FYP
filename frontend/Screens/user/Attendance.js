import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, ToastAndroid } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function Attendance() {
  const uniHost = "172.26.160.1";
  const homeHost = "192.168.10.12";
  // const homeHost = "10.121.28.223";
  const context = useContext(Context);
  const { handleGetNotification, notificationData, getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers, getProfileData } = context;
  const theme = useTheme();
  const color = theme.text;
  const backgroundColor = theme.bg;
  const boxbg = theme.boxBg;
  const navBg = theme.navBg;
  const colorDark = theme.textDark;

  return (
    <>
      <View style={[Styles.mainContainer, { backgroundColor }]}>
        <TopNav text="Attendance" />

        <View>
          <AnimatedCircularProgress
            size={100} // Diameter of the progress bar
            width={10}  // Stroke width of the progress bar
            fill={70}   // Current progress (0 to 100)
            tintColor="#3498db" // Color of the progress bar
            backgroundColor="#e0e0e0" // Color of the background circle
          />
          <View style={[Styles.attendanceContainerInner]}>
            <TouchableOpacity><Text style={[Styles.markBtn, { color, backgroundColor: "green" }]}>Present</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[Styles.markBtn, { color, backgroundColor: "red" }]}>Absent</Text></TouchableOpacity>
          </View>
          <ScrollView style={[Styles.detailContainer]}>
            <View style={[Styles.detailContainerInner, { borderBottomColor: color, borderBottomWidth: 1 }]}>
              <Text style={[{ color }]}>Status</Text>
              <Text style={[{ color }]}>Date</Text>
            </View>
            <View style={[Styles.detailContainerInner]}>
              <Text style={[{ color }]}>Present</Text>
              <Text style={[{ color }]}>15,6,2024</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
};

const Styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 10 },
  attendanceContainerInner: { flexDirection: "row", justifyContent: "space-around", margin: 20 },
  markBtn: { borderWidth: 1, borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30, fontWeight: "500" },

  detailContainer: { padding: 20 },
  detailContainerInner: { flexDirection: "row", justifyContent: "space-around", padding: 10 },
})