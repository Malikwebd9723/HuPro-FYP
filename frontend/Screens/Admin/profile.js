import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ToastAndroid } from "react-native";
import TopNav from "../../components/TopNav";
import { useTheme } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/States";
import { MaskedTextInput } from "react-native-mask-text";
import AntDesign from "react-native-vector-icons/AntDesign"

export default function Profile() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const context = useContext(Context);
    const {handleLogOut, getProfileData, profileData, handleUpdateuser } = context;

    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    const [details, setDetails] = useState({
        fullname: profileData.fullname,
        fathername: profileData.fathername,
        email: profileData.email,
        roll: profileData.roll,
        department: profileData.department,
        semester: profileData.semester,
        address: profileData.address,
        cnic: profileData.cnic,
        contact: profileData.contact
    })

    const { fullname, fathername, roll, department, semester, address, cnic, contact } = details;

    const validation = async () => {
        if (fullname && fathername && department && address && cnic && contact !== "") {
            const id = await AsyncStorage.getItem("user");
            const userData = {
                id,
                fullname,
                fathername,
                roll,
                department,
                semester,
                address,
                cnic,
                contact
            };
            await handleUpdateuser(userData);
            await getProfileData(id);
            setIsModalVisible(!isModalVisible);

        } else {
            ToastAndroid.show("Fill all the fields correctly!", ToastAndroid.LONG)
        }
    }

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>
            <TopNav text="Profile" />
            <ScrollView>

                {/* the modal we will use to upate user details */}
                <Modal transparent animationType="fade" visible={isModalVisible}>
                    <View style={styles.transparentContainer}></View>
                    <View style={[styles.modal, { backgroundColor: navBg }]}>
                        <Text style={styles.h2}>Update Profile</Text>

                        <ScrollView>
                            <View style={[styles.detailsContainer, { borderColor: color, width: "100%" }]}>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Full Name:</Text>
                                    <TextInput  multiline value={fullname} onChangeText={(text) => setDetails(({ ...details, fullname: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Father Name:</Text>
                                    <TextInput multiline value={fathername} onChangeText={(text) => setDetails(({ ...details, fathername: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Roll #:</Text>
                                    <TextInput multiline value={roll} keyboardType="numeric" onChangeText={(text) => setDetails(({ ...details, roll: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Department:</Text>
                                    <TextInput multiline value={department} onChangeText={(text) => setDetails(({ ...details, department: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Semester:</Text>
                                    <TextInput multiline value={semester} keyboardType="numeric" onChangeText={(text) => setDetails(({ ...details, semester: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Address:</Text>
                                    <TextInput multiline value={address} onChangeText={(text) => setDetails(({ ...details, address: text }))} style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>CNIC #</Text>
                                    <MaskedTextInput value={cnic} onChangeText={(text) => setDetails(({ ...details, cnic: text }))} keyboardType="numeric" placeholder="12345-6789234-9" mask="99999-9999999-9" style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>

                                <View style={[styles.detailsContainerInner]}>
                                    <Text style={[styles.keys, { color }]}>Contact #</Text>
                                    <MaskedTextInput value={contact} onChangeText={(text) => setDetails(({ ...details, contact: text }))} keyboardType="phone-pad" placeholder="0123-4567890" mask="0999-9999999" style={[styles.values, { backgroundColor: boxbg, color: colorDark }]} />
                                </View>


                                <View style={styles.modalBtn}>

                                    <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => { setIsModalVisible(!isModalVisible) }}><Text style={[styles.closeModalBtnText, { color }]}>Close</Text></TouchableOpacity>

                                    <TouchableOpacity style={[styles.closeModalBtn, { backgroundColor, color }]} onPress={() => validation()}><Text style={[styles.closeModalBtnText, { color }]}>Save</Text></TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>

                    </View>

                    <View style={styles.transparentContainer}></View>

                </Modal>


                <View style={[styles.nameContainer]}>
                    <Text style={[styles.name, { color }]}>{profileData.fullname.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => handleLogOut()}><Text style={[{ color, padding:10}]}><AntDesign name="logout" size={23} color={color}/></Text></TouchableOpacity>
                    
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
                        <Text style={[styles.keys, { color }]}>Address:</Text>
                        <TextInput multiline style={[styles.values, { backgroundColor: boxbg, color: colorDark }]}>{profileData.address}</TextInput>
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
    name: { flex:1, fontSize: 20 },

    updateBtn: { flex: 1, padding: 5, borderRadius: 10, margin: 10 },

    detailsContainer: { borderWidth: 1, borderRadius: 10, padding: 5,marginVertical:10 },
    detailsContainerInner: { flexDirection: "row", alignItems: "center" },
    keys: { fontWeight: "400", flex: 1 },
    values: { flex: 3, padding: 10, margin: 10, fontWeight: "600", borderRadius: 20 },

    modal: { flex: 5, padding: 10, borderRadius: 10 },
    transparentContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5 )" },
    h2: { fontSize: 25, fontWeight: "500" },
    modalBtn: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
    closeModalBtn: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, margin: 10 },
    closeModalBtnText: { fontSize: 15, fontWeight: "500" },
})