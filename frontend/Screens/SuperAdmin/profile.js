import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function Profile(){
    return(
        <ScrollView>
            <View>
                <Text>Profile page</Text>
                <TouchableOpacity onPress={()=>AsyncStorage.clear()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};