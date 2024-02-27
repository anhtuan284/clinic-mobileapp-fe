import React from "react";
import { View, FlatList } from "react-native";
import Doctor from "./Doctor";

const DoctorList = ({ doctors }) => {
  const renderDoctor = ({ item }) => <Doctor doctor={item} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.user_info.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default DoctorList;