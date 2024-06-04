import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { useState } from "react";
import { useTheme } from "styled-components";

export default function Registration() {
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;
    // const uniHost = "172.26.160.1";
    const homeHost = "https://hu-pro-fyp.vercel.app";
    const navigation = useNavigation();
    const [selectedGender, setSelectedGender] = useState("");
    const [load, setLoad] = useState(false);
    const [cred, setCred] = useState({
        fullname: "",
        fathername: "",
        email: "",
        gender: "",
        roll: "",
        department: "",
        semester: "",
        address: "",
        cnic: "",
        contact: ""
    })

    const { fullname, fathername, email, gender, roll, department, semester, address, cnic, contact } = cred;

    const validation = () => {
        if (fullname && fathername && email && gender && department && address && cnic && contact !== "") {
            handleRegister();
        } else {
            ToastAndroid.show("Fill all the fields correctly!", ToastAndroid.LONG)
        }
    }
    const handleRegister = async () => {
        setLoad(true);
        const userData = {
            fullname,
            fathername,
            email,
            gender,
            roll,
            department,
            semester,
            address,
            cnic,
            contact,
        };

        try {


            const response = await fetch(`${homeHost}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const json = await response.json();
            if (json.success == true) {
                setCred({
                    fullname: "",
                    fathername: "",
                    email: "",
                    gender: "",
                    roll: "",
                    department: "",
                    semester: "",
                    address: "",
                    cnic: "",
                    contact: ""
                })
                ToastAndroid.show(json.message, ToastAndroid.LONG)
                setLoad(false)
                navigation.navigate("Login")
            } else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
                setLoad(false)
            }

        } catch (error) {
            ToastAndroid.show("Aplogize! Server error, Try again later", ToastAndroid.LONG)
            setLoad(false);
        }
    }

    const handleGender = (value) => {
        setSelectedGender(value);
        setCred(({ ...cred, gender: value }))
    }
    return (
        <>
            <ScrollView style={[{ backgroundColor }]} showsVerticalScrollIndicator={false}>
                <View style={[styles.firstContainer, { backgroundColor: navBg }]}>
                    <Text style={[styles.h1, { color: colorDark }]}>HuPro</Text>

                    <Text style={[styles.h2, { color: colorDark }]}>Get yourself registered</Text>
                </View>
                {load ? <ActivityIndicator size={30} color={color}/> :
                    <KeyboardAvoidingView >
                        <View style={[styles.secondContainer]}>
                            <Text style={styles.text}>Fill all the fields correctly, to avoid registeration failure!</Text>
                            <Text style={{ color }}>Full Name</Text>
                            <TextInput value={cred.fullname} onChangeText={(text) => setCred(({ ...cred, fullname: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Full name" />

                            <Text style={{ color }}>Father Name</Text>
                            <TextInput value={cred.fathername} onChangeText={(text) => setCred(({ ...cred, fathername: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Father name" />

                            <Text style={{ color }}>Email Address</Text>
                            <TextInput value={cred.email} onChangeText={(text) => setCred(({ ...cred, email: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Email address" keyboardType="email-address" />

                            <Text style={{ color }}>Select Gender</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", padding: 10 }}>
                                <Text style={{ backgroundColor: selectedGender == "male" ? boxbg : "grey", padding: 10, borderRadius: 10, }} onPress={() => handleGender("male")}>Male</Text>
                                <Text style={{ backgroundColor: selectedGender == "female" ? boxbg : "grey", padding: 10, borderRadius: 10, }} onPress={() => handleGender("female")}>Female</Text>
                                <Text style={{ backgroundColor: selectedGender == "other" ? boxbg : "grey", padding: 10, borderRadius: 10, }} onPress={() => handleGender("other")}>Other</Text>
                            </View>

                            <Text style={{ color }}>Roll No# (optional for faculty)</Text>
                            <TextInput value={cred.roll} onChangeText={(text) => setCred(({ ...cred, roll: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Roll no" keyboardType="numeric" />

                            <Text style={{ color }}>Department</Text>
                            <TextInput value={cred.department} onChangeText={(text) => setCred(({ ...cred, department: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Department" />

                            <Text style={{ color }}>Semester (optional for faculty)</Text>
                            <TextInput value={cred.semester} onChangeText={(text) => setCred(({ ...cred, semester: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Current semester" keyboardType="numeric" />

                            <Text style={{ color }}>Address</Text>
                            <TextInput value={cred.address} onChangeText={(text) => setCred(({ ...cred, address: text }))} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Address" />

                            <Text style={{ color }}>CNIC No#</Text>
                            <MaskedTextInput value={cred.cnic} onChangeText={(text) => setCred(({ ...cred, cnic: text }))} keyboardType="numeric" placeholder="12345-6789234-9" mask="99999-9999999-9" style={[styles.input, { backgroundColor: boxbg }]} />

                            <Text style={{ color }}>Contact No#</Text>
                            <MaskedTextInput value={cred.contact} onChangeText={(text) => setCred(({ ...cred, contact: text }))} keyboardType="phone-pad" placeholder="0123-4567890" mask="0999-9999999" style={[styles.input, { backgroundColor: boxbg }]} />

                            <TouchableOpacity onPress={validation} style={styles.loginBtn}>

                                <Text style={styles.loginBtnText}>Register</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color }}>Already registered?</Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                }
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    firstContainer: { paddingVertical: 50, borderBottomWidth: 1, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
    h1: { textAlign: "center", fontSize: 35, fontWeight: "900" },
    h2: { textAlign: "center", fontSize: 20, fontWeight: "400" },
    secondContainer: { alignItems: "center", gap: 10, paddingVertical: 30 },
    text: { color: "orange" },
    input: { borderWidth: 1, borderRadius: 10, width: "80%", padding: 10, fontSize: 15 },
    loginBtn: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "30%", alignItems: "center" },
    loginBtnText: { fontSize: 15 },
})