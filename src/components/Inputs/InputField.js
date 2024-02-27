import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { styleFields } from "./InputFieldStyle";
import { Feather } from "@expo/vector-icons";

const InputField = ({
  label,
  placeholder,
  error,
  onChangeText,
  secureEntry,
  style,
  keyboardType,
  value,
  onPressIn,
  icon, // Thêm prop icon
  OnPressIncon,
  onBlur,
}) => {
  const combinedStyle = StyleSheet.compose(styleFields.inputForm, style);

  return (
    <View>
      <Text style={styleFields.labelText}>{label}</Text>
      {icon && (
        <View style={styleFields.iconContainer}>
          <TouchableOpacity onPress={OnPressIncon} style={{top: 8}}>
            <Feather name={icon} size={22} color="#6b6b6b" />
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        style={combinedStyle}
        onChangeText={onChangeText}
        secureTextEntry={secureEntry}
        placeholderTextColor="#333"
        keyboardType={keyboardType}
        value={value}
        onPressIn={onPressIn}
        onBlur={onBlur}
      />
      {error && <Text style={styleFields.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
