import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, ToastAndroid, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";

export default function SuperAdmin() {
    const uniHost = "172.26.160.1";
    const homeHost = "192.168.10.7";
    const context = useContext(Context);
    const {handleGetNotification, notificationData, getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers ,getProfileData} = context;
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    // functionality to show category and modal
    const [catShow, setCatShow] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [catToShow, setCatToShow] = useState("")
    const [message, setMessage] = useState("");
    const [load,setLoad] = useState(false);

    // show modal to add notification
    const addNotification = () => {
        setIsModalVisible(true);
        setCatToShow("")
        setMessage("")
    }

    const handleCat = () => {
        setCatShow(!catShow)
    }
    const handleCatToShow = (value) => {
        setCatToShow(value);
        setCatShow(!catShow);
    };

    const handleNotificationBox = (type, message) => {
        setIsModalVisible(true);
        setCatToShow(type)
        setMessage(message)
    }

    // fetch all the notification on start
    useEffect(() => {
        handleGetNotification();
        getRegisteredUsers();
        getApplicantUsers();
        const getId = async()=>{
            const userId = await AsyncStorage.getItem("user");
            getProfileData(userId);
        }
        getId();
    }, [isModalVisible, message])

    // sending a notification to backend
    const type = catToShow;
    const handleSetNotification = async () => {
        try {
            setLoad(true);
            if (message !== "" && catToShow !== "") {
                const response = await fetch(`http://${homeHost}:8001/setNotification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ type, message })
                });
                const json = await response.json();
                ToastAndroid.show(json.message, ToastAndroid.SHORT);
                setIsModalVisible(!isModalVisible);
                setLoad(false);
            } else {
                ToastAndroid.show("Fill all the fields", ToastAndroid.LONG);
                setLoad(false);
            }
        } catch (error) {
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            setIsModalVisible(!isModalVisible);
            setLoad(false);
        }
    }

    // delete notification from database
    const handleDeleteNotification = async (id) => {
        try {
            const response = await fetch(`http://${homeHost}:8001/deleteNotification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            });
            setMessage(id)
            const json = await response.json();
            ToastAndroid.show(json.message, ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show("Error deleting notification", ToastAndroid.LONG)
        }
    }
    return (
        <View style={{flex:1}}>
            <ScrollView style={[styles.mainContainer, { backgroundColor }]}>

                {/* the modal we will use to upate notification content */}
                <Modal transparent animationType="fade" visible={isModalVisible}>
                    <View style={styles.transparentContainer}></View>
                    {load ? <ActivityIndicator size={20}/>:
                    <View style={[styles.modal, { backgroundColor: navBg }]}>
                        <Text style={styles.h2}>New Notification</Text>
                        <Text style={{ color: "brown" }}>New notification will override the older one with same "Type"!</Text>
                        <Text style={{ color: "brown" }}>Notification will be disappear after 24 hours!</Text>
                        <ScrollView style={{ width: "100%" }}>
                            <View style={[styles.modalContainer, { borderColor: boxbg }]}>
                                {/* button to select the category to show */}
                                <TouchableOpacity onPress={handleCat} style={[styles.cat, { backgroundColor }]}><Text style={[styles.catText, { color }]}>{catToShow.toUpperCase()}</Text><Text style={[styles.catText, { color, fontSize: 20 }]}>{catShow ? " ▼" : " ▶"} </Text></TouchableOpacity>

                                {/* select content of category section */}
                                {catShow && <View style={[styles.boxContainer, { backgroundColor }]}>
                                    <View style={styles.boxInner}>
                                        <Text onPress={() => handleCatToShow("urgent call")} style={[styles.h6, { color, marginVertical: 5 }]}>Urgent Call</Text>
                                        <Text onPress={() => handleCatToShow("meeting")} style={[styles.h6, { color, marginVertical: 5 }]}>Meeting</Text>
                                        <Text onPress={() => handleCatToShow("information")} style={[styles.h6, { color, marginVertical: 5 }]}>Information</Text>
                                    </View>
                                </View>}
                                <TextInput multiline value={message} onChangeText={(text) => setMessage(text)} style={[styles.notificationMesage, { color: colorDark }]} placeholder="Enter your message"></TextInput>
                            </View>
                        </ScrollView>
                        <View style={styles.modalBtn}>
                            <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => { setIsModalVisible(!isModalVisible) }}><Text style={[styles.closeModalBtnText, { color }]}>Close</Text></TouchableOpacity>

                            <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => handleSetNotification()}><Text style={[styles.closeModalBtnText, { color }]}>Send</Text></TouchableOpacity>
                        </View>
                    </View>}
                    <View style={styles.transparentContainer}></View>
                </Modal>
                {/* this is a TopNav pre built component */}
                <TopNav text="HuPro" />


                {/* starting the admin home screen */}
                <View style={styles.sectionTwo}>
                    <Text style={[styles.h2, { color }]}>Greetings, Chief</Text>
                </View>
                <View >
                    <Text style={[styles.h3, { color: colorDark, backgroundColor: boxbg }]}>Protors Statistics</Text>
                    <View style={[styles.stateInner, { borderColor: navBg }]}>
                        <Text style={[styles.h4, { color }]}>Total</Text>
                        <Text style={[styles.h6, { color }]}>{registeredUsers.length + applicantUsers.length}</Text>
                    </View>
                    <View style={styles.stateContainer}>
                        <View style={[styles.stateInner, { borderColor: navBg }]}>
                            <Text style={[styles.h4, { color }]}>Registered</Text>
                            <Text style={[styles.h6, { color }]}>{registeredUsers.length-1}</Text>
                        </View>
                        <View style={[styles.stateInner, { borderColor: navBg }]}>
                            <Text style={[styles.h4, { color }]}>Applicants</Text>
                            <Text style={[styles.h6, { color }]}>{applicantUsers.length}</Text>
                        </View>
                    </View>
                </View>

                {/* box where we show all the notification content */}
                <View style={styles.notificationContainer}>

                    <Text style={[styles.h3, { color: colorDark, backgroundColor: boxbg }]}>New Notification</Text>
                    <Text onPress={addNotification} style={[styles.h5, { color: colorDark, backgroundColor: boxbg }]}>Add new</Text>

                    {notificationData.length !== 0 ? notificationData.map((item) => {
                        return (

                            <TouchableOpacity key={item.type} onPress={() => handleNotificationBox(item.type, item.message)} style={[styles.notification, { color, borderColor: navBg }]}>

                                <View>
                                    <Text style={[styles.h4, { color }]}>{item.type.toUpperCase()}</Text>
                                    <Text style={[styles.h6, { color }]}>{item.message}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteNotification(item._id)} style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Delete</Text></TouchableOpacity>
                                </View>

                            </TouchableOpacity>
                        )
                    })
                        :
                        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.notification, { color, borderColor: navBg }]}>
                            <Text style={[styles.h6, { color }]}>No notification to show!</Text>

                        </TouchableOpacity>}
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10 },
    h2: { fontSize: 25, fontWeight: "500" },
    sectionTwo: { marginVertical: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    h3: { fontSize: 20, paddingVertical: 10, textAlign: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    stateContainer: { flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around" },
    stateInner: { minWidth: "42%", alignItems: "center", justifyContent: "center", padding: 10, margin: 10, borderWidth: 1, borderRadius: 10 },
    h4: { fontSize: 18, padding: 5, fontWeight: "600" },
    h5: { fontSize: 15, padding: 10, fontWeight: "300", textAlign: "center" },
    h6: { fontSize: 13, padding: 5, fontWeight: "300" },
    notificationContainer: { marginVertical: 20 },
    notification: { width: "100%", padding: 20, textAlign: "center", borderWidth: 0.5 },
    modal: { alignItems: "center", justifyContent: "center", flex: 3, borderRadius: 10, paddingTop: 20 },
    transparentContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
    modalContainer: { borderWidth: 1, borderRadius: 10, margin: 10 },
    cat: { padding: 10, margin: 10, flexDirection: "row", alignItems: "center" },
    catText: { fontSize: 15, fontWeight: "500" },
    boxContainer: { flexDirection: 'row', flexWrap: "wrap", marginHorizontal: 10 },
    boxInner: { justifyContent: "center", padding: 10 },
    notificationMesage: { margin: 10, borderWidth: 1, borderRadius: 10, padding: 10 },
    modalBtn: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
    closeModalBtn: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, margin: 10 },
    closeModalBtnText: { fontSize: 15, fontWeight: "500" },
    btn: { width: "50%", alignItems: "center", marginRight: 10, borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 10 },

})
