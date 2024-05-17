import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, TextInput, ToastAndroid } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";

export default function Duties() {
    const [users, setUsers] = useState([])
    const [catShow, setCatShow] = useState("");
    const [duty, setDuty] = useState("");
    const context = useContext(Context);
    const { getRegisteredUsers, registeredUsers, handleAssignDuty } = context;

    const fullDate = new Date();
    const today = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();
    const date = `${today},${month + 1},${year}`;

    useEffect(() => {
        setUsers(...users, registeredUsers.filter((user) => user.privilege == "User"));
    }, [])
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    const handleSetDuty = async (text) => {
        setDuty(text);
    };

    const handleCustomDuty = async (id) => {
        if (duty !== "") {
            await handleAssignDuty({ id, duty });
            await getRegisteredUsers();
            setCatShow("");
        } else {
            ToastAndroid.show("Assign duty first", ToastAndroid.LONG)
        }
    }

    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={[styles.boxContainer, { borderColor: boxbg }]}>

                <View style={[styles.boxInner, { borderColor: navBg }]}>

                    <View style={styles.nameContainer}>
                        <Text style={[styles.h5, { color, flex: 2 }]}>{item.fullname.toUpperCase()}</Text>

                        <Text style={[{ color, flex: 1 }]}>{item.roll}</Text>

                        {item.lastattendance[0].date == "" || item.lastattendance[0].date !== date ?
                            <Text style={{ color: "red", fontWeight: "500", flex: 1 }}>absent</Text>:
                            <Text style={{ color: item.lastattendance[0].status == "present"? "green": "red", fontWeight: "500", flex: 1 }}>{item.lastattendance[0].status}</Text>}
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Father Name: </Text>{item.fathername.toUpperCase()}</Text>

                            <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Department: </Text>{item.department}</Text>

                            <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Semester: </Text>{item.semester}</Text>

                            <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Gender: </Text>{item.gender}</Text>

                            <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Contact#: </Text>{item.contact}</Text>
                        </View>

                        <TouchableOpacity onPress={() => setCatShow(item.roll)}>
                            <View style={[styles.dutyContainer, { backgroundColor: boxbg }]}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ color }}>Assign Duty</Text>
                                    <Text style={[styles.catText, { color, fontSize: 20 }]}>{catShow ? "▼" : "▶"} </Text>
                                </View>

                                {catShow == item.roll ?
                                    <View>
                                        <TouchableOpacity onPress={() => { handleSetDuty("main gate") }} ><Text style={{ color: colorDark, padding: 5 }}>{duty == "main gate" ? <Text>✔</Text> : ""} Main Gate</Text></TouchableOpacity>

                                        <TouchableOpacity onPress={() => { handleSetDuty("second gate") }} ><Text style={{ color: colorDark, padding: 5 }}>{duty == "second gate" ? <Text>✔</Text> : ""} Second Gate</Text></TouchableOpacity>

                                        <TouchableOpacity onPress={() => { handleSetDuty("third gate") }} ><Text style={{ color: colorDark, padding: 5 }}>{duty == "third gate" ? <Text>✔</Text> : ""} Third Gate</Text></TouchableOpacity>

                                        <TextInput onChangeText={(text) => { setDuty(text) }} placeholder="Assign custom duty" style={{ borderColor: colorDark, borderWidth: 1, borderRadius: 10 }} />

                                        <TouchableOpacity onPress={() => { handleCustomDuty(item._id) }} style={styles.btn}><Text style={{ color: colorDark }}>Save</Text></TouchableOpacity>
                                    </View> : ""}

                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>


            {/* Defalut topnav componet */}
            <TopNav text="Assign Duties" />

            {/* display the registered proctors list */}
            <FlatList
                data={users}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color }}>Nothing to show!</Text>
                    </View>
                )} />
        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10, paddingBottom: "18%", minHeight: "100%" },
    h2: { fontSize: 25, fontWeight: "400" },
    sectionTwo: { marginVertical: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    h3: { fontSize: 20, paddingVertical: 10, textAlign: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    boxContainer: { flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around" },
    boxInner: { width: "100%", justifyContent: "center", padding: 10, margin: 10, borderWidth: 1, borderRadius: 10 },
    h5: { fontSize: 18, padding: 5, fontWeight: "600" },
    h6: { fontSize: 13, padding: 5, fontWeight: "300" },
    detailsContainer: { flexDirection: "row" },
    nameContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    dutyContainer: { borderRadius: 10, padding: 10 },
    catText: { fontSize: 15, fontWeight: "500" },
    btn: { borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 10, backgroundColor: "green", alignItems: "center" },
    btnContainer: { flexDirection: "row" }
})
