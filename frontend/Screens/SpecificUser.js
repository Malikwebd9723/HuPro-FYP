import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert} from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context/States";
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';




export default function UserData() {
    const context = useContext(Context);
    const { getRegisteredUsers, getApplicantUsers, deleteSpecificUser, registerSpecificUser } = context;
    const route = useRoute();
    const { item } = route.params;
    const [checkInCoords, setCheckInCoords] = useState("");
    const [checkOutCoords, setCheckOutCoords] = useState("");
    const [attendanceShow, setAttendanceShow] = useState(false);

    useEffect(() => {
        setCheckInCoords({
            latitude: (item.checkIn[0].latitude),
            longitude: (item.checkIn[0].longitude),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        })
        setCheckOutCoords({
            latitude: (item.checkOut[0].latitude),
            longitude: (item.checkOut[0].longitude),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        })
        getRegisteredUsers();
        getApplicantUsers();
    }, [])
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    const handleConfirmDelete = (name, id) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to delete ${name}`,
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => deleteSpecificUser(id) },
            ]
        );
    };

    const handleConfirmRegister = (name, id) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to register ${name}`,
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => registerSpecificUser(id) },
            ]
        );
    };

    //  get today date
    const fullDate = new Date();
    const today = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();
    const date = `${today},${month + 1},${year}`;
    return (
        <>
            <View style={[styles.mainContainer, { backgroundColor }]}>

                {/* Defalut topnav componet */}
                <TopNav text={item.fullname.toUpperCase()} />

                <ScrollView>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Father Name: </Text>{item.fathername.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Gender: </Text>{item.gender}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Roll#: </Text>{item.roll}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Department: </Text>{item.department}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Email: </Text>{item.email}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>CNIC#: </Text>{item.cnic}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Contact# : </Text>{item.contact}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Address: </Text>{item.address}</Text>

                    <TouchableOpacity onPress={() => setAttendanceShow(!attendanceShow)}>
                        <Text style={[{ color, fontSize: 20, textAlign: "center", margin: 10, padding: 10, backgroundColor: boxbg, borderRadius: 20 }]}>Attendance Details</Text>
                    </TouchableOpacity>
                    {attendanceShow && item.lastattendance[0].date !== "" ?
                        <ScrollView style={[styles.detailContainer]}>
                            <View style={[styles.detailContainerInner, { borderBottomColor: color, borderBottomWidth: 1 }]}>
                                <Text style={[{ color }]}>Status</Text>
                                <Text style={[{ color }]}>Date</Text>
                            </View>
                            {item.attendance.slice(1).map((item) => {
                                return (
                                    <View key={item.date} style={[styles.detailContainerInner]}>
                                        <Text style={[{ color }]}>{item.status}</Text>
                                        <Text style={[{ color }]}>{item.date}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView> : ""}
                    {item.checkIn[0].date == date ?
                        <>
                            <Text style={[{ color, fontSize: 15, fontWeight: "400", textAlign: "center" }]}>CheckIn at {item.checkIn[0].time.slice(11)}</Text>
                            <View style={[styles.container, { borderColor: boxbg }]}>
                                <MapView
                                    style={styles.map}
                                    region={checkInCoords}
                                    initialZoom={20}
                                    mapType="hybrid"
                                >
                                    <Marker
                                        coordinate={checkInCoords} // Specify coordinates for the marker
                                        title="Check-In Location" // Optional title displayed on tap
                                        description="This is where they checked in." // Optional description (iOS only)
                                    />
                                </MapView>
                            </View>
                            {item.checkOut[0].date == date ?
                                <>
                                    <Text style={[{ color, fontSize: 15, fontWeight: "400", textAlign: "center" }]}>CheckOut at {item.checkOut[0].time.slice(11)}</Text>
                                    <View style={[styles.container, { borderColor: boxbg }]}>
                                        <MapView
                                            style={styles.map}
                                            region={checkOutCoords}
                                            initialZoom={20}
                                            mapType="hybrid"
                                        >
                                            <Marker
                                                coordinate={checkOutCoords} // Specify coordinates for the marker
                                                title="Check-Out Location" // Optional title displayed on tap
                                                description="This is where they checked out." // Optional description (iOS only)
                                            />
                                        </MapView>
                                    </View>
                                </> : ""}
                        </> : ""}
                    {item.userVerified == false ? <TouchableOpacity onPress={() => { handleConfirmRegister(item.fullname.toUpperCase(), item._id,) }} style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Register</Text></TouchableOpacity> : ""}
                    <TouchableOpacity onPress={() => { handleConfirmDelete(item.fullname.toUpperCase(), item._id) }} style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Delete User</Text></TouchableOpacity>
                </ScrollView>
            </View>


        </>
    )
};


const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: 10 },
    cat: { padding: 10, marginVertical: 5, flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "50%" },
    catText: { fontSize: 15, fontWeight: "500" },
    h2: { fontSize: 25, fontWeight: "400" },
    sectionTwo: { marginVertical: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    h3: { fontSize: 20, paddingVertical: 10, textAlign: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    boxContainer: { flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around" },
    boxInner: { width: "100%", justifyContent: "center", padding: 10, margin: 10, borderWidth: 1, borderRadius: 10 },
    h5: { fontSize: 18, padding: 5, fontWeight: "600" },
    h6: { fontSize: 13, padding: 5, fontWeight: "300" },
    btn: { marginRight: 10, borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 10 },
    btnContainer: { flexDirection: "row" },

    detailContainer: { padding: 20 },
    detailContainerInner: { flexDirection: "row", justifyContent: "space-around", padding: 10 },

    container: { margin: 20, padding: 5, borderWidth: 3 },
    map: {
        height: 200,
        width: "100%"
    },
})
