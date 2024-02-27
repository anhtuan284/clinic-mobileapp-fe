import { Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";

export default Dict = ({tit, value}) => {
    return (
       <View style={[MyStyles.row, {width: "80%"}]}>
            <Text style={{fontWeight: 'bold'}}>{tit}: </Text>
            <Text>{value}</Text>
       </View>
    );
}
