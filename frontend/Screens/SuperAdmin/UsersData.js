import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useState } from "react";


export default function UserData() {
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
    }

    const users = [
        {
            name: "malik usman",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "usman",
            fathername: "mukhtar",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "malik",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "hesham",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
    ]
    const applicants = [
        {
            name: "malik usman",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "usman",
            fathername: "mukhtar",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "malik",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "hesham",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
    ]
    const newlyRegistered = [
        {
            name: "malik usman",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "usman",
            fathername: "mukhtar",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "malik",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
        {
            name: "hesham",
            fathername: "mukhtar ahmed",
            roll: "302-20162",
            department:"cs & it",
            email: "malik9723usman@gmail.com",
            cnic: '13503-9692587-9',
            contact: "0336-4006048",
            address: "muradpur tehsil and dist mansehra"
        },
    ]
    const HeaderComponent = () => {
        return (
            <Text style={[styles.h3, { color: colorDark, backgroundColor: boxbg }]}>{catToShow.toUpperCase()}</Text>
        );
      };
    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={[styles.boxContainer, { borderColor: boxbg }]}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text style={[styles.h5, { color }]}>{item.name.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}>{item.fathername.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}>{item.roll}</Text>
                    <Text style={[styles.h6, { color }]}>{item.department.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}>{item.email}</Text>
                    <Text style={[styles.h6, { color }]}>{item.cnic}</Text>
                    <Text style={[styles.h6, { color }]}>{item.contact}</Text>
                    <Text style={[styles.h6, { color }]}>{item.address}</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: boxbg }]}><Text style={[{ color: colorDark, fontWeight: "500" }]}>Delete User</Text></TouchableOpacity>
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
            <TouchableOpacity onPress={handleCat} style={[styles.cat, { borderColor: navBg }]}><Text style={[styles.catText, { color }]}>Select Category</Text><Text style={[styles.catText, { color, fontSize: 20 }]}>{catShow ? "▼" : "▶"} </Text></TouchableOpacity>


            {/* select content of category section */}
            {catShow && <View style={styles.boxContainer}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text text="registered" onPress={() => handleCatToShow("registered")} style={[styles.h6, { color, marginVertical: 5 }]}>Registered</Text>
                    <Text onPress={() => handleCatToShow("newly registered")} style={[styles.h6, { color, marginVertical: 5 }]}>Newly Registered</Text>
                    <Text onPress={() => handleCatToShow("applicant")} style={[styles.h6, { color, marginVertical: 5 }]}>Applicant</Text>
                </View>
            </View>}


            {/* display the registered proctors list */}
            {catToShow == "registered" ?
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        ListHeaderComponent={<HeaderComponent/>} // Pass the header component here
                    />
                 : ""}


            {/* display the list of newly registered proctors */}
            {catToShow == "newly registered" ?
                <FlatList
                data={newlyRegistered}
                renderItem={renderItem}
                ListHeaderComponent={<HeaderComponent/>} // Pass the header component here
            /> : ""}


            {/* display the list of newly registered proctors */}
            {catToShow == "applicant" ?
                <FlatList
                data={applicants}
                renderItem={renderItem}
                ListHeaderComponent={<HeaderComponent/>} // Pass the header component here
            /> : ""}

        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10,paddingBottom:"32%"},
    cat: {padding: 10, marginVertical: 5, flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "50%" },
    catText: { fontSize: 15, fontWeight: "500" },
    h2: { fontSize: 25, fontWeight: "400" },
    sectionTwo: {marginVertical: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    h3: { fontSize: 20, paddingVertical: 10, textAlign: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    boxContainer: { flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around"},
    boxInner: { width: "100%", justifyContent: "center", padding: 10, margin: 10, borderWidth: 1, borderRadius: 10 },
    h5: { fontSize: 18, padding: 5, fontWeight: "600" },
    h6: { fontSize: 13, padding: 5, fontWeight: "300" },
    btn: { marginRight: 10, borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 10 },
    btnContainer: { flexDirection: "row" }
})
