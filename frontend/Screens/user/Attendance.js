import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";


export default function Attendance() {
  const uniHost = "172.26.160.1";
  const homeHost = "192.168.10.12";
  // const homeHost = "10.121.28.223";
  const context = useContext(Context);
  const { handleGetNotification, notificationData, getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers, profileData, getProfileData, handleAttendance } = context;
  const theme = useTheme();
  const color = theme.text;
  const backgroundColor = theme.bg;
  const boxbg = theme.boxBg;
  const navBg = theme.navBg;
  const colorDark = theme.textDark;

  //  get today date
  const fullDate = new Date();
  const today = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const date = `${today},${month + 1},${year}`;

  const [disabled, setDisabled] = useState(false)
  const[load,setLoad] = useState(true);

  const handleConfirmPresent = async (status) => {
    Alert.alert(
      'Confirmation',
      `Sure to ${status}?`,
      [
        { text: 'No' },
        { text: 'Yes', onPress: () => markAttendance(status) },
      ]
    );
  };

  const markAttendance = async (status) => {
    await handleAttendance({ id: profileData._id, date, status });
    await getId();
    setDisabled(true);
    setLoad(false)
  }

  const getId = async () => {
    const userId = await AsyncStorage.getItem("user");
    getProfileData(userId);
  }

  useEffect(() => {
    setLoad(false)
  }, [])
  return (
    <>
      <View style={[Styles.mainContainer, { backgroundColor }]}>
        <TopNav text="Attendance" />
        <View>
          <View style={[Styles.attendanceContainerInner]}>

            <TouchableOpacity disabled={profileData.lastattendance[0].date == date || disabled} onPress={() => { handleConfirmPresent("present") }}><Text style={[Styles.markBtn, { color, backgroundColor: profileData.lastattendance[0].date == date || disabled ? "grey" : "green" }]}>Present</Text></TouchableOpacity>

            <TouchableOpacity disabled={profileData.lastattendance[0].date == date || disabled} onPress={() => { handleConfirmPresent("absent") }}><Text style={[Styles.markBtn, { color, backgroundColor: profileData.lastattendance[0].date == date || disabled ? "grey" : "red" }]}>Absent</Text></TouchableOpacity>

          </View>
          {load ? <ActivityIndicator size={30}/>:
          <ScrollView style={[Styles.detailContainer]}>
            <View style={[Styles.detailContainerInner, { borderBottomColor: color, borderBottomWidth: 1 }]}>
              <Text style={[{ color }]}>Status</Text>
              <Text style={[{ color }]}>Date</Text>
            </View>
            {profileData.attendance.map((item) => {
              return (
                <>
                  {item.date !== "" ?
                    <View style={[Styles.detailContainerInner]}>
                      <Text style={[{ color }]}>{item.status}</Text>
                      <Text style={[{ color }]}>{item.date}</Text>
                    </View> : ""}
                </>
              )
            })}
          </ScrollView>}
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