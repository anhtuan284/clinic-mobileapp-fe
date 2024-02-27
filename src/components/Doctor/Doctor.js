import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";

const Doctor = ({ doctor }) => {
  return (
    <TouchableOpacity style={[{ flexDirection: "column"},  MyStyles.doctorView]}>
      <View style={{width: "100%", overflow: "hidden"}}>
        <Image
          source={{ uri: doctor.user_info.avatar }}
          style={{ width: 180, height: 180 , resizeMode: 'cover' } }
        />
      </View>
      <View style={[{ marginTop: 10 }, MyStyles.container]}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Dr. {doctor.user_info.first_name} {doctor.user_info.last_name}
        </Text>
        <Text style={{ marginBottom: 5 }}>{doctor.specialty}</Text>
        <Text style={{ marginBottom: 7 , borderWidth: 2, borderColor: "blue", borderRadius: 9, padding: 4}}>Exp: {doctor.exp_year} years</Text>
        {/* <Text>Salary: {doctor.salary}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default Doctor;