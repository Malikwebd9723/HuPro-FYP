import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { useState } from "react";

export default function Login() {
    const uniHost = "172.26.160.1";
    const homeHost = "192.168.10.11";
    const navigation = useNavigation();
    const [selectedGender, setSelectedGender] = useState("");
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


            const response = await fetch(`http://${homeHost}:8001/register`, {
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
            } else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)

            }

        } catch (error) {
            ToastAndroid.show("Aplogize! Server error, Try again later", ToastAndroid.LONG)
        }
    }

    const handleGender = (value) => {
        setSelectedGender(value);
        setCred(({ ...cred, gender: value }))
    }
    return (
        <>
            <View style={styles.firstContainer}>
                <Text style={styles.h1}>HuPro</Text>

                <Text style={styles.h2}>Get yourself registered</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView >
                    <View style={styles.secondContainer}>
                        <Text style={styles.text}>Fill all the fields correctly otherwise you will not be registred</Text>
                        <Text>Full Name</Text>
                        <TextInput value={cred.fullname} onChangeText={(text) => setCred(({ ...cred, fullname: text }))} style={styles.input} placeholder="Full name" />

                        <Text>Father Name</Text>
                        <TextInput value={cred.fathername} onChangeText={(text) => setCred(({ ...cred, fathername: text }))} style={styles.input} placeholder="Father name" />

                        <Text>Email Address</Text>
                        <TextInput value={cred.email} onChangeText={(text) => setCred(({ ...cred, email: text }))} style={styles.input} placeholder="Email address" keyboardType="email-address" />

                        <Text>Select Gender</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", padding: 10 }}>
                            <Text style={{ backgroundColor: selectedGender == "male" ? "grey" : "white", padding: 10, borderRadius: 10 }} onPress={() => handleGender("male")}>Male</Text>
                            <Text style={{ backgroundColor: selectedGender == "female" ? "grey" : "white", padding: 10, borderRadius: 10 }} onPress={() => handleGender("female")}>Female</Text>
                            <Text style={{ backgroundColor: selectedGender == "other" ? "grey" : "white", padding: 10, borderRadius: 10 }} onPress={() => handleGender("other")}>Other</Text>
                        </View>

                        <Text>Roll No# (optional for faculty)</Text>
                        <TextInput value={cred.roll} onChangeText={(text) => setCred(({ ...cred, roll: text }))} style={styles.input} placeholder="Roll no" keyboardType="numeric" />

                        <Text>Department</Text>
                        <TextInput value={cred.department} onChangeText={(text) => setCred(({ ...cred, department: text }))} style={styles.input} placeholder="Department" />

                        <Text>Semester (optional for faculty)</Text>
                        <TextInput value={cred.semester} onChangeText={(text) => setCred(({ ...cred, semester: text }))} style={styles.input} placeholder="Current semester" keyboardType="numeric" />

                        <Text>Address</Text>
                        <TextInput value={cred.address} onChangeText={(text) => setCred(({ ...cred, address: text }))} style={styles.input} placeholder="Address" />

                        <Text>CNIC No#</Text>
                        <MaskedTextInput value={cred.cnic} onChangeText={(text) => setCred(({ ...cred, cnic: text }))} keyboardType="numeric" placeholder="12345-6789234-9" mask="99999-9999999-9" style={styles.input} />

                        <Text>Contact No#</Text>
                        <MaskedTextInput value={cred.contact} onChangeText={(text) => setCred(({ ...cred, contact: text }))} keyboardType="phone-pad" placeholder="0123-4567890" mask="0999-9999999" style={styles.input} />

                        <TouchableOpacity onPress={validation} style={styles.loginBtn}>

                            <Text style={styles.loginBtnText}>Register</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: "blue" }}>Already registered?</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    firstContainer: { paddingVertical: 50, borderBottomWidth: 1, borderRadius: 20 },
    h1: { textAlign: "center", fontSize: 35, fontWeight: "900" },
    h2: { textAlign: "center", fontSize: 20, fontWeight: "400" },
    secondContainer: { alignItems: "center", gap: 10, paddingVertical: 30 },
    text: { color: "orange" },
    input: { borderWidth: 1, borderRadius: 10, width: "80%", padding: 10, fontSize: 15 },
    loginBtn: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "30%", alignItems: "center" },
    loginBtnText: { fontSize: 15 },
})