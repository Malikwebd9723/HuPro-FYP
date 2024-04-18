import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function Duties(){
    return(
        <ScrollView>
            <View>
                <Text>Duties page</Text>
                <TouchableOpacity onPress={()=>AsyncStorage.clear()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};