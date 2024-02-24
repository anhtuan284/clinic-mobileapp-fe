import { Text, View } from "react-native"
import MyStyles from "../styles/MyStyles"
import InputField from "../components/Inputs/InputField"
import Logout from "../components/User/Logout"

export default ProfileScreen = () => {
    return (
        <View style={MyStyles.fullScreenBox} >
            <Text>Profile</Text>
            <InputField placeholder="Enter Scheduled" label="Nhập ok Scheduled"/>
            <Logout/>
        </View>
    )
}