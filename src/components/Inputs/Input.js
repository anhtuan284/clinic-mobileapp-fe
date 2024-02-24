import React from "react";
import { TextInput } from "react-native";
import { InputContainer } from "./InputComponents";


// props {title, onChange, value}
export function SingleInput(props) {
    return (
        <InputContainer title={props.title}>
            <TextInput
                style={{ height: 40, backgroundColor: 'lightgray' }}
                onChangeText={props.onChange}
                value={props.value}
            />
        </InputContainer>
    );
}

export function MultiInput(props) {
    return (
        <InputContainer title={props.title}>
            <TextInput
                style={{ height: 100, backgroundColor: 'lightgray' }}
                onChangeText={props.onChange}
                value={props.value}
                multiline
                numberOfLines={5}
            />
        </InputContainer>
    );
}
