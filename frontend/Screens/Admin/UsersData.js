import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, Alert, TextInput, VirtualizedList } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";

export default function UserData() {
    const context = useContext(Context);
    const { getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers, registerSpecificUser, deleteSpecificUser, searchUser } = context;
    useEffect(() => {
        getRegisteredUsers();
        getApplicantUsers();
    }, [])
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;
    const [catShow, setCatShow] = useState(false)
    const [catToShow, setCatToShow] = useState("registered")
    const handleCat = () => {
        setCatShow(!catShow)
    }
    const handleCatToShow = (value) => {
        setCatToShow(value);
        setCatShow(!catShow);
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


    const HeaderComponent = () => {
        return (
            <Text style={[styles.h3, { color: colorDark, backgroundColor: boxbg }]}>{catToShow.toUpperCase()}</Text>
        );
    };
    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={[styles.boxContainer, { borderColor: boxbg }]}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text style={[styles.h5, { color }]}>{item.fullname.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Father Name: </Text>{item.fathername.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Gender: </Text>{item.gender}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Roll#: </Text>{item.roll}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Department: </Text>{item.department}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Email: </Text>{item.email}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>CNIC#: </Text>{item.cnic}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Contact# : </Text>{item.contact}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Address: </Text>{item.address}</Text>
                    {catToShow == "applicants" ? <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Apply on: </Text>{item.createdAt.split("T")[0]}</Text> : ""}
                    <View style={styles.btnContainer}>
                        {catToShow == "applicants" ? <TouchableOpacity onPress={() => { handleConfirmRegister(item.fullname.toUpperCase(), item._id,) }} style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Register</Text></TouchableOpacity> : ""}

                        <TouchableOpacity onPress={() => { handleConfirmDelete(item.fullname.toUpperCase(), item._id) }} style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Delete User</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>


            {/* Defalut topnav componet */}
            <TopNav text="Proctors" />


            {/* button to select the category to show */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={handleCat} style={[styles.cat, { borderColor: navBg }]}><Text style={[styles.catText, { color }]}>Select Category</Text><Text style={[styles.catText, { color, fontSize: 20 }]}>{catShow ? "▼" : "▶"} </Text></TouchableOpacity>

                {catToShow == "registered" ?
                    <TextInput keyboardType="numeric" onChangeText={(text) => { searchUser(text) }} placeholderTextColor={colorDark} placeholder="Search user by roll#" style={{ backgroundColor: boxbg, color: colorDark, borderRadius: 10, marginVertical: 10, paddingHorizontal: 15 }}></TextInput> : ""}
            </View>

            {/* select content of category section */}
            {catShow && <View style={styles.boxContainer}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text text="registered" onPress={() => handleCatToShow("registered")}
                        style={[styles.h6, { color, marginVertical: 5 }]}>Registered</Text>

                    <Text onPress={() => handleCatToShow("applicants")} style={[styles.h6, { color, marginVertical: 5 }]}>Applicants</Text>
                </View>
            </View>}


            {/* display the registered proctors list */}
            {catToShow == "registered" ?
                <FlatList
                    data={registeredUsers}
                    renderItem={renderItem}
                    ListHeaderComponent={<HeaderComponent />}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color }}>No registered users!</Text>
                        </View>
                    )}
                />
                : <FlatList
                    data={applicantUsers}
                    renderItem={renderItem}
                    ListHeaderComponent={<HeaderComponent />}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color }}>No applicants to display!</Text>
                        </View>
                    )}
                />}
        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10, paddingBottom: "35%",minHeight:"100%" },
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
    btnContainer: { flexDirection: "row" }
})
