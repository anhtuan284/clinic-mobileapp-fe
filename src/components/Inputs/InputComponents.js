import React from "react";
import { Text, View } from "react-native";
import SurveyStyles from "../../styles/SurveyStyles";

// type InputContainerProps = {
//     title:string;
//     children:React.ReactNode;
// }

export function InputContainer(props) {
    return (
        <View style={SurveyStyles.questionSection}>
            <Text style={SurveyStyles.questionHeading}>{props.title}</Text>
            {props.children}
        </View>
    );

}