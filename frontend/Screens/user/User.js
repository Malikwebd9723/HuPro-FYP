import { StyleSheet, ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert } from "react-native";
import TopNav from "../../components/TopNav";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/States";
import { useTheme } from "styled-components";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"



export default function User() {
  const context = useContext(Context);
  const { getProfileData, profileData, handleGetNotification, notificationData, getLocation, location, handleCheckIn, handleCheckOut } = context;
  const theme = useTheme();
  const color = theme.text;
  const backgroundColor = theme.bg;
  const boxbg = theme.boxBg;
  const navBg = theme.navBg;
  const colorDark = theme.textDark;

  const [loading, setLoading] = useState(true);
  


  const getId = async () => {
    const userId = await AsyncStorage.getItem("user");
    getProfileData(userId);

  }

  useEffect(() => {
    handleGetNotification();
    getLocation();

    getId();
    setLoading(false);
  }, [])

  //  get today date
  const fullDate = new Date();
  const today = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const date = `${today},${month + 1},${year}`;


  const handleConfirmCheckIn = () => {
    Alert.alert(
      'Confirmation',
      `Sure to CheckIn?`,
      [
        { text: 'No' },
        { text: 'Yes', onPress: () => handleCheckIn({ id: profileData._id, date, latitude: location.coords.latitude, longitude: location.coords.longitude }) },
      ]
    );
    getId();
  };

  const handleConfirmCheckOut = () => {
    Alert.alert(
      'Confirmation',
      `Sure to CheckIn?`,
      [
        { text: 'No' },
        { text: 'Yes', onPress: () => handleCheckOut({ id: profileData._id, date, latitude: location.coords.latitude, longitude: location.coords.longitude }) },
      ]
    );
  };
  return (
    <>
      <View style={[Styles.mainContainer, { backgroundColor }]}>
        <TopNav text={"HuPro"} />
        {
          loading ? <ActivityIndicator size="large" /> :
            <ScrollView>
              <Text style={[Styles.name, { color }]}>Greetings, {profileData.fullname}</Text>

              {/* notification container || first section */}
              <View style={[Styles.notificationContainer, { borderColor: color }]}>
                <Text style={[Styles.h3, { color, backgroundColor: boxbg }]}>Notification</Text>
                {notificationData.length !== 0 ? notificationData.map((item) => {
                  return (
                    <View key={item._id} style={[Styles.notificationContainerInner, { borderColor: boxbg }]}>
                      <Text style={[Styles.h3, { color }]}>{item.type.toUpperCase()}</Text>
                      <Text style={[Styles.h5, { color }]}>{item.message}</Text>
                    </View>
                  )
                }) :
                  <Text style={[Styles.notificationContainerInner, { color }]}>There is no new notification</Text>}
              </View>

              {/* duty container || second section */}

              <View style={[Styles.dutyContainer]}>
                <View>
                  <Text style={[Styles.h5, { color, padding: 10 }]}>Today Duty</Text>
                  <View style={[Styles.dutyContainerInner, { backgroundColor: boxbg }]}>
                    <FontAwesome6 name="location-dot" size={25} color={color} />
                    {profileData.dutyPlace !== "" ?
                      <Text style={[Styles.h3, { color }]}>{profileData.dutyPlace}</Text> :
                      <Text style={[Styles.h3, { color }]}>No duty assigned yet</Text>}
                  </View>
                </View>
              </View>

              {/* checkIn and Out container || third section */}
              <View style={[Styles.CheckInOutContainer]}>
                {location == false ?
                  <Text style={[{ color: "red", textAlign: "center" }]}>Allow location access for check In or Out</Text> : ""}

                <TouchableOpacity onPress={() => { handleConfirmCheckIn() }} disabled={location == false ? true : false} style={[Styles.checkInBtn, { backgroundColor: location == false ? "grey" : boxbg }]}>
                  <Text style={[Styles.h3, { color: location == false ? "lightgrey" : color }]}>Check In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleConfirmCheckOut() }} disabled={location == false ? true : false} style={[Styles.checkInBtn, { backgroundColor: location == false ? "grey" : boxbg }]}>
                  <Text style={[Styles.h3, { color: location == false ? "lightgrey" : color }]}>Check Out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>}
      </View>
    </>
  )
};

const Styles = StyleSheet.create({
  mainContainer: { padding: 10, flex: 1 },
  name: { fontSize: 25, paddingHorizontal: 10 },

  notificationContainer: { borderBottomWidth: 0.5, marginVertical: 20, paddingVertical: 20 },
  h3: { textAlign: "center", fontSize: 20, padding: 10, borderRadius: 10 },
  notificationContainerInner: { padding: 10, borderWidth: 1, borderRadius: 10, marginHorizontal: 20, marginVertical: 10 },
  h5: { textAlign: "center", fontSize: 15, padding: 1 },

  dutyContainer: { margin: 10 },
  dutyContainerInner: { padding: 20, borderWidth: 1, borderRadius: 10, alignItems: "center" },

  CheckInOutContainer: {},
  checkInBtn: { margin: 10, borderRadius: 10 },
  checkOutBtn: { margin: 10, borderRadius: 10 },
})
