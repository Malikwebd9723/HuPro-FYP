import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function Admin(){
    return(
        <ScrollView>
            <View>
                <Text>I am Admin</Text>
                <TouchableOpacity onPress={()=>AsyncStorage.clear()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};