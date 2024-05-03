import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "styled-components";
import TopNav from "../../components/TopNav";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/States";

export default function Duties() {
    const [users, setUsers] = useState([])
    const context = useContext(Context);
    const { getRegisteredUsers, registeredUsers } = context;
    useEffect(() => {
        getRegisteredUsers();
        setUsers(...users, registeredUsers.filter(user => user.dutyPlace !== "main gate" && user.dutyPlace !== "second gate" && user.dutyPlace !== "third gate"));
    }, [])
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;
    const [catShow, setCatShow] = useState(false)
    const [catToShow, setCatToShow] = useState("main gate")
    const handleCat = () => {
        setCatShow(!catShow)
    }
    const handleCatToShow = (value) => {
        setCatToShow(value);
        setCatShow(!catShow);
    };



    const HeaderComponent = () => {
        return (
            <Text style={[styles.h3, { color: colorDark, backgroundColor: boxbg }]}>{catToShow.toUpperCase()}</Text>
        );
    };
    const renderItem = ({ item }) => (
        <ScrollView>
            {item.dutyPlace == catToShow ?
                <View style={[styles.boxContainer, { borderColor: boxbg }]}>
                    <View style={[styles.boxInner, { borderColor: navBg }]}>
                        <Text style={[styles.h5, { color }]}>{item.fullname.toUpperCase()}</Text>
                        <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Fater Name: </Text>{item.fathername.toUpperCase()}</Text>
                        <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Gender: </Text>{item.gender}</Text>
                        <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Contact#: </Text>{item.contact}</Text>
                    </View>
                </View> : ""}
        </ScrollView>
    );

    const renderItemOthers = ({ item }) => (
        <ScrollView>
            <View style={[styles.boxContainer, { borderColor: boxbg }]}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text style={[styles.h5, { color }]}>{item.fullname.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Fater Name: </Text>{item.fathername.toUpperCase()}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Gender: </Text>{item.gender}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Contact#: </Text>{item.contact}</Text>
                    <Text style={[styles.h6, { color }]}><Text style={{ fontWeight: "500" }}>Duty place#: </Text>{item.dutyPlace}</Text>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>


            {/* Defalut topnav componet */}
            <TopNav text="Duties" />


            {/* button to select the category to show */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={handleCat} style={[styles.cat, { borderColor: navBg }]}><Text style={[styles.catText, { color }]}>Select Duty Place</Text><Text style={[styles.catText, { color, fontSize: 20 }]}>{catShow ? "▼" : "▶"} </Text></TouchableOpacity>
            </View>

            {/* select content of category section */}
            {catShow && <View style={styles.boxContainer}>
                <View style={[styles.boxInner, { borderColor: navBg }]}>
                    <Text text="registered" onPress={() => handleCatToShow("main gate")}
                        style={[styles.h6, { color, marginVertical: 5 }]}>Main Gate</Text>

                    <Text onPress={() => handleCatToShow("second gate")} style={[styles.h6, { color, marginVertical: 5 }]}>Second Gate</Text>


                    <Text onPress={() => handleCatToShow("third gate")} style={[styles.h6, { color, marginVertical: 5 }]}>Third Gate</Text>

                    <Text onPress={() => handleCatToShow("other")} style={[styles.h6, { color, marginVertical: 5 }]}>Other</Text>
                </View>
            </View>}


            {/* display the registered proctors list */}
            {catToShow == "main gate" || catToShow == "second gate" || catToShow == "third gate" ?
                <FlatList
                    data={registeredUsers}
                    renderItem={renderItem}
                    ListHeaderComponent={<HeaderComponent />}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color }}>Nothing to show!</Text>
                        </View>
                    )} />

                : <FlatList
                    data={users}
                    renderItem={renderItemOthers}
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
    mainContainer: { padding: 10, paddingBottom: "32%", minHeight: "100%" },
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
