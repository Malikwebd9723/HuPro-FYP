import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import TopNav from "../../components/TopNav";
import { useTheme } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/States";


export default function Profile() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const context = useContext(Context);
    const { getProfileData, profileData } = context;

    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    const handleUpdateDetails = async () => {
        const userId = await AsyncStorage.getItem("user");
        getProfileData(userId);
    }

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>

            {/* the modal we will use to upate user details */}
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <Modal transparent animationType="fade" visible={isModalVisible}>
                <View style={styles.transparentContainer}></View>
                <ScrollView>
                <View style={[styles.modal, { backgroundColor: navBg }]}>
                        <View style={[styles.detailsContainer,{ borderColor: color,width:"100%" }]}>
                            <Text style={styles.h2}>Update Profile</Text>



                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Full Name:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.fullname}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Father Name:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.fathername}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Email:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.email}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Roll#:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.roll}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Department:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.department}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Semester:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.semester}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>CNIC#:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.cnic}</TextInput>
                            </View>

                            <View style={[styles.detailsContainerInner]}>
                                <Text style={[styles.keys, { color }]}>Contact#:</Text>
                                <TextInput style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.contact}</TextInput>
                            </View>
                        </View>
                    <View style={styles.modalBtn}>
                        <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => { setIsModalVisible(!isModalVisible) }}><Text style={[styles.closeModalBtnText, { color }]}>Close</Text></TouchableOpacity>

                        <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => handleUpdateDetails()}><Text style={[styles.closeModalBtnText, { color }]}>Save</Text></TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                <View style={styles.transparentContainer}></View>
            </Modal>
            </View>


            <TopNav text="Profile" />
            <ScrollView>
                <View style={[styles.nameContainer]}>
                    <Text style={[styles.name, { color }]}>{profileData.fullname.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => AsyncStorage.clear()}><Text style={[{ color }]}>LogOut</Text></TouchableOpacity>
                </View>

                {profileData.emailVerified == false ? <Text style={[{ color: "red", paddingBottom: 10 }]}>Your email is not verified, check your G-mail.</Text> : ""}

                <View style={[styles.detailsContainer, { borderColor: color }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[{ color, flex: 1 }]}>Profile Settings</Text>
                        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}><Text style={[styles.updateBtn, { backgroundColor: boxbg, color: colorDark }]}>Update</Text></TouchableOpacity>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Acces:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.privilege}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Father Name:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.fathername}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Gender:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.gender}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Email:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.email}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Roll#:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.roll}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Department:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.department}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Semester:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.semester}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>CNIC#:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.cnic}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys, { color }]}>Contact#:</Text>
                        <Text style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.contact}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10, paddingBottom: "20%", minHeight: "100%" },
    nameContainer: { marginVertical: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    name: { fontSize: 30 },

    updateBtn: { flex: 1, padding: 5, borderRadius: 10, margin: 10 },

    detailsContainer: { borderWidth: 1, borderRadius: 10, padding: 10 },
    detailsContainerInner: { flexDirection: "row", alignItems: "center" },
    keys: { fontWeight: "400", flex: 1 },
    values: { flex: 3, padding: 10, margin: 10, fontWeight: "600", borderRadius: 20 },

    modal: {felx:3,alignItems: "center", justifyContent: "center", borderRadius: 10, paddingTop: 20 },
    transparentContainer: {flex:1,backgroundColor: "rgba(0, 0, 0, 0.5)" },
    h2: { fontSize: 25, fontWeight: "500" },
    modalBtn: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
    closeModalBtn: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, margin: 10 },
    closeModalBtnText: { fontSize: 15, fontWeight: "500" },
})